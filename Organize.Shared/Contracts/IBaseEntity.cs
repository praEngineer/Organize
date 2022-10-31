using System.ComponentModel;

namespace Organize.Shared.Contracts
{
    public interface IBaseEntity: INotifyPropertyChanged
    {
        int id { get; set; }
    }
}