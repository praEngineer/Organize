using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Organize.WASM
{
    public partial class App
    {
        public App()
        {
            Console.WriteLine("app starts here.");
        }

        [Inject] IServiceProvider sp { get; set; }

        protected override void OnInitialized()
        {
            Console.WriteLine("app then here.");
        }
    }
}
