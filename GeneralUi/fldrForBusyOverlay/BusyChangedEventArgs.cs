using System;
using System.Collections.Generic;
using System.Text;

namespace GeneralUi.nsBusyOverlay
{
    public class BusyChangedEventArgs : EventArgs
    {
        public BusyEnum BusyState { get; set; }
    }
}
