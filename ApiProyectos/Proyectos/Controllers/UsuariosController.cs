using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Proyectos;
using Proyectos.DTOS;
using Proyectos.Entidades;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Pacientes.Controllers
{
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;

        public CuentasController(ApplicationDBContext context ,UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [Route("proyectos/auth/crear")]
        [HttpPost]
        public async Task<ActionResult<RespuestaAutenticacion>> Crear([FromBody] CredencialesUsuariosDTO credenciales)
        {
            var usuario = new IdentityUser { UserName = credenciales.Email, Email = credenciales.Email };
            var resultado = await userManager.CreateAsync(usuario, credenciales.Password);

            if (resultado.Succeeded)
            {
                return await ConstruirToken(credenciales);
            }
            else
            {
                return BadRequest(resultado.Errors);
            }
        }

        [HttpPost]
        [Route("proyectos/auth/login")]
        public async Task<ActionResult<RespuestaAutenticacion>> Login([FromBody] CredencialesUsuariosDTO credenciales)
        {
            var resultado = await signInManager.PasswordSignInAsync(credenciales.Email!, credenciales.Password!, isPersistent: false, lockoutOnFailure: false);

            if (resultado.Succeeded)
            {
                return await ConstruirToken(credenciales);
            }
            else
            {
                return BadRequest("Login incorrecto");
            }
        }
        private async Task<RespuestaAutenticacion> ConstruirToken(CredencialesUsuariosDTO credenciales)

        {
            var usuarioLog = await userManager.FindByEmailAsync(credenciales.Email);

            var claims = new List<Claim>()
            {
                new Claim("email", usuarioLog.Email!),
                new Claim(ClaimTypes.NameIdentifier, usuarioLog.Id)
            };
            var usuario = await userManager.FindByEmailAsync(credenciales.Email!);
            var claimsDB = await userManager.GetClaimsAsync(usuario!);

            claims.AddRange(claimsDB);

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ARK4LMDPREEFFDFFDEERQXZER456LLKDKFV"));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion, signingCredentials: creds);

            return new RespuestaAutenticacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                FechaExpiracion = expiracion,
            };
        }
    }
}