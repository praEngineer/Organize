using Organize.Shared.Entities;
using Organize.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Entities
{
    public class ChildItem : BaseItem // important usage for persisting in the database
    {
        public int? BelongsToUserId { get; set; }
    }
}
