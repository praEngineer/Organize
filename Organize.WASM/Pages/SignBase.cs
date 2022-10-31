using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Organize.WASM.Pages
{
    public class SignBase : ComponentBase
    {

        protected EditContext EditContext { get; set; }

        protected string LastSubmitResult = "";
        protected void OnValidationTrouble()
        {
            LastSubmitResult = "Trouble:";
        }

        public string GetError(Expression<Func<object>> fu) // what is Expression<Func<object>> ??? https://learn.microsoft.com/en-us/dotnet/api/system.linq.expressions.expression-1?view=net-7.0
        { // strongly typed lambda expression as a data structure in the form of an expression tree ???
            if (EditContext == null)
            {
                return null;
            }
            string rslt = EditContext.GetValidationMessages(fu).FirstOrDefault(); // one call for each text box on the sign-up page (five), or sign-in page (twice)
            return rslt;
        }
    }
}
