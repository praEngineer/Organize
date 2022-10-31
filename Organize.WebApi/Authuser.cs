using Organize.Shared.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organize.Persistence_WebAPI
{
    public class AuthUser : IAuthUser // because attributes on clsUser have required decorations that are inappropriate to the WebAPI
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
