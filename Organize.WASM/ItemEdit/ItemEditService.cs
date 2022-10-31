using GeneralUi;
using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Organize.WASM.ItemEdit
{
    public class ItemEditService
    {
        public event EventHandler<ItemEditEventArgs> EditItemChanged;
        /*
        An event is an instance variable which holds a reference to a MultiCastDelegate msdn.microsoft.com/de-de/library/system.multicastdelegate.aspx 
        Removing the last listener removes the multicastdelegate instance and the event object becomes null.

        Delegates are immutable. You get a reference to the current multicast delegate, and when handlers are added or removed the backing 
        field points to a new delegate created from two immutable ones.

        The usual reason to copy the invocation list to a local variable is some form of thread-safety: a handler could be unsubscribed 
        between the usual nullity check (check that the invocation list isn't empty) and the actual invocation: that way you might 
        accidentally fire an event with no handlers and a NullReferenceException would be thrown.

        https://stackoverflow.com/questions/12217632/calling-an-event-handler-in-c-sharp
        */

        private BaseItem _editItem;

        public BaseItem EditItem
        {
            get { return _editItem; }
            set
            {
                if (_editItem == value)
                {
                    return;
                }

                // following only when the 'value' is different than the current provate _editItem
                _editItem = value;
                var args = new ItemEditEventArgs();
                args.Item = _editItem;  // .Item is a property added to the System.EvtArgs class in ItemEditEventArgs.cs
                OnEditItemChanged(args); // see below declaration of OnEditItemChanged; raise the event and all the handlers of the event
            }
        }

        protected virtual void OnEditItemChanged(ItemEditEventArgs e)
        {
            EventHandler<ItemEditEventArgs> handler = EditItemChanged;
            if (handler != null) // check makes sure at least one listener is registered to that event.
            {
                handler(this, e); // will call every registered event listener.
                                  // Event listeners subscribe with help of the += operator and unsubscribe with -= operator to that event.
                                  // ' this ' signals the event listener so it knows who raised the ThresholdReached event. That is, who was the sender of the event.
                                  // ' e ' is the event argument which is also passed into the listener method.  It can contain more
                                  //    useful informations about the ThresholdReached event e.g., which threshold was reached.
                                  //    In this implementation, e was sent by the setter of ' public EditItem ' via the ' args ' parameter.
                                  // https://stackoverflow.com/questions/12217632/calling-an-event-handler-in-c-sharp
                /*
                Within a class, you can have an EventHandler by any name, e.g., xyz.  
                An event handler can call a method defined within the same class, e.g., meth1, meth2.
                Any number of event handler commands (e.g., execute meth1) can be assiged to xyz.
                    xyz += new EventHandler(meth1);
                You can assign meth1 multiple times.  
                    xyz += new EventHandler(meth1);
                    xyz += new EventHandler(meth1);
                    xyz += new EventHandler(meth1);
                Whenever xyz.Invoke() is called, each of the assigned methods are fired.
                For example xyz.Invoke() will cause meth1 to fire four times (four code lines of ' xyz += new EventHandler(meth1); '), but not meth2.
                Invoke() will call the EventHandlers in the order they were created.
                https://www.dotnetperls.com/event#:~:text=C%23%20event%20Examples%20Use%20an%20event%20type%20with,event%20handler%20syntax%2C%20we%20create%20a%20notification%20system.
                */
            }
        }
    }
}
