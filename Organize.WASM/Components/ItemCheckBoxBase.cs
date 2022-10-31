using Microsoft.AspNetCore.Components;
using Organize.Shared.Contracts;
using Organize.Shared.Entities; 
using System; 
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organize.WASM.Components
{
    public class ItemCheckBoxBase : ComponentBase
    {
        [Parameter]
        public BaseItem Item { get; set; } // implemented/referred to as @Item in the razor file

        [CascadingParameter] // no matter how far down the tree you go, ColorPrefix is always available
        public string ColorPrefix { get; set; }

        [Inject]
        private IForItemsManager ItemManager { get; set; }

        public async Task ChangeIsDone()
        {
            Item.IsDone = !Item.IsDone;
            await ItemManager.UpdateAsync(Item);
        }
    }
}
