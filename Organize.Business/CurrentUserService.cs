using Organize.Shared.Contracts;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Organize.Business
{
    public class cCurrentUserService : ICurrentUserService
    {
        private clsUser _CurrentUser;
        public clsUser cCurrentUser { get { return _CurrentUser; } set { _CurrentUser = value; } }
    }
}
