using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Entities
{
    public class cParentItem:BaseItem // class name and store name in IndexedDB have to mat
    {
        public ObservableCollection<ChildItem>? ChildItems { get; set; }
        // observatble allows program to listen for changes to the collection
    }
}
