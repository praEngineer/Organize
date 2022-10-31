using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Organize.Shared.Entities;
using Organize.Business_TestFake;
using Newtonsoft.Json.Linq;

namespace Organize.Persistence_WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private static readonly IList<clsUser> WebAPI_Users = new List<clsUser>();  // instead of a SQL database table

        //static UsersController()
        //{
        //    var user = new clsUser();
        //    user.id = cTestUserAndItemData.TestUser.id;
        //    user.userName = cTestUserAndItemData.TestUser.userName;
        //    user.password = cTestUserAndItemData.TestUser.password;
        //    user.firstName = cTestUserAndItemData.TestUser.firstName;
        //    user.lastName = cTestUserAndItemData.TestUser.lastName;
        //    WebAPI_Users.Add(user);
        //}
        public UsersController(AppSettings appSettings)
        {
            _appSettings = appSettings; // see Startup.cs
        }

        public void Options() { }

        [HttpPost("clear")]
        [AllowAnonymous] // blocks authentication logic so anyone can try to sign-in
        public IActionResult ClearUsers()
        {
            WebAPI_Users.Clear();
            return Ok("user list cleared");
        }

        [HttpPost("clearTest")]
        [AllowAnonymous] // blocks authentication logic so anyone can try to sign-in
        public IActionResult ClearTestUser(JObject itemAsJson)
        {
            var aTestUser = itemAsJson.ToObject<clsUser>();

            var anyMatchingUser = WebAPI_Users.FirstOrDefault(i => i.id == aTestUser.id);
            if (anyMatchingUser == null)
            {
                return Ok("No test user found with id of " + aTestUser.id);
            }

            WebAPI_Users.Remove(anyMatchingUser);
            return Ok();
        }

        [HttpGet]
        public IActionResult Get() // /api/Users/Get
        { // based upon JWT string

            Console.WriteLine("user info sent in request: {0}", Request.HttpContext.User.ToString());
            var idDerivedFromJWT = int.Parse(Request.HttpContext.User.FindFirst("id").Value); // this is the id pulled from the JWT value sent in the Request header
            var foundUser = WebAPI_Users.FirstOrDefault(u => u.id == idDerivedFromJWT); // look up in the database table simulation using the "id of the token"
                                                                             // clsUser.id is embedded in the JWT of the request header
            if (foundUser == null)
            {
                return BadRequest(new { message = "User not found" });
            }

            return Ok(foundUser);
        }

        [HttpPost("authenticate")]
        [AllowAnonymous] // blocks authentication logic so anyone can try to sign-in
        public IActionResult Authenticate([FromBody] AuthUser JSONuidpwd)
        {
            /* JSONuidpwd expected content follows this pattern (property names are not case sensitive):
             
                {
                    "userName":"Ben",
                    "password":"test"
                }

             */
            var foundUser = WebAPI_Users.FirstOrDefault(u => u.userName == JSONuidpwd.UserName && u.password == JSONuidpwd.Password);
            if(foundUser == null)
            {

                return BadRequest(new { message = "User name or password invalid" });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var claims = new Claim[]
            { // use the clsUser id as a 'seed' to create a JWT 
                new Claim("id",foundUser.id.ToString()), 
                new Claim(ClaimTypes.Role,"admin")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), 
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor); // see jwt.io to unscramble the JWT string

            var returnUser = new clsUser
            {
                id = foundUser.id,
                userName = foundUser.userName,
                firstName = foundUser.firstName,
                lastName = foundUser.lastName,
                genderType = foundUser.genderType,
                phoneNumber = foundUser.phoneNumber,
                token = tokenHandler.WriteToken(securityToken)
            };

            return Ok(returnUser);
        }


        [HttpPost]
        [AllowAnonymous] // have to allow the system to append to the WebAPI_Users list
        public IActionResult Post([FromBody] clsUser user)
        {
            var foundUser = WebAPI_Users.FirstOrDefault(u => u.userName == user.userName);
            if (foundUser != null)
            {
                return BadRequest(new { message = "User already exists" });
            }

            var newId = WebAPI_Users.Count == 0
                ? 1
                : WebAPI_Users.Max(i => i.id) + 1;
            if(!(user.id > 0)) // test user has id of 123 already defined
            {
                user.id = newId;
            }
            WebAPI_Users.Add(user);

            return Ok(user.id);
        }
    }
}
