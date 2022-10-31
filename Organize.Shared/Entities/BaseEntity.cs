using System;
using System.Collections.Generic;
using System.Text;
using Organize.Shared.Contracts;

namespace Organize.Shared.Entities
{
    public class BaseEntity : NotifyingObject // C# knows cls2 : cls2
, IBaseEntity
    {
        public int id
        {
            get
            {
                return _id;
            }
            set
            {
                if (_id == value)
                {
                    return;
                }

                _id = value;
                NotifyPropertyChanged();
            }
        }

        private int _id;
    }
}
