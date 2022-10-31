window.addEventListener('resize',
    () => {
        //Call the static Method OnResize in the Organize assembly
        console.log("Static Resize from js");
        DotNet.invokeMethodAsync("Organize.WASM", "OnResize");
        /*
          DotNet comes with Blazor and is available because of <script src="_framework/blazor.webassembly.js"></script> in the index.html file
          "Organize.WASM" is the UI 
          "OnResize" is the method we want to invoke in .NET  It needs to be both 'public' and 'static'
          "OnResize" is defined in the Mainlayout.razor.cs
         */
    });

//window.blazorDimension = { // moved to jsIsolation.js
//    getWidth: () => window.innerWidth  // window.innerWidth is javascript, getWidth is our arbitrary name for a javascript function
//}

// window is a default javasript object to which we attach blazorResize
window.blazorResize = {
    assignments: [],
    registerReferenceForResizeEvent: (name,dotnetReference) => {
        const handler = () => { // create a handler for the resize event
            console.log("HandleResize from js");
            dotnetReference.invokeMethodAsync("HandleResize", window.innerWidth, window.innerHeight);
        }
        const assignment = { // who called, and what handler is associated
            name: name,
            handler: handler
        }
        blazorResize.assignments.push(assignment); // add assignment const to the assignments array [] at the top of this javascript object
        window.addEventListener("resize", assignment.handler);
    },
    unRegister: (name) => {
        const assignment = blazorResize.assignments.find(a => a.name === name);
        if (assignment != null) {
            console.log(assignment);
            window.removeEventListener("resize", assignment.handler);
        }
    }
}