using Organize.Shared.Contracts;
using Organize.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Entities
{
    public class cSuspectUser : IAuthUser
    {
       private string? _UserName;

       public cSuspectUser()
        { // constructor
            Password = String.Empty;
            _UserName= String.Empty;
        }

        [Required(ErrorMessage = "no UID"), StringLength(100, MinimumLength = 3, ErrorMessage = "ID has to be a credible length.")]
        public string? UserName
        {
            get => _UserName;
            set { _UserName = value; }
        }

        [Required(ErrorMessage = "no password"),
        StringLength(100, MinimumLength = 8, ErrorMessage = "unacceptable password"),
        RegularExpression(@"^[a-zA-Z0-9-]{8,}\b$", ErrorMessage = "PWD has to be mysterious.")]
        public string? Password { get; set; } // for validation to work, the property has to be nullable

        public void ExtractUnPwd(clsUser objUser)
        {
            clsUser lcl = objUser.Clone();
            Password = lcl.password;
            UserName = lcl.userName;
        }

        public override string ToString()
        {
            return $"{UserName}";
        }
    }
}
