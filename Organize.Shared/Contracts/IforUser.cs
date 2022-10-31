using Organize.Shared.Entities;
using Organize.Shared.Enums;
using System.Collections.ObjectModel;

namespace Organize.Shared.Contracts
{
    public interface IforUser
    {
        public int id { get; set; }
        string? firstName { get; set; }
        GenderTypeEnum genderType { get; set; }
        bool isUserItemsPropertyLoaded { get; set; }
        string? lastName { get; set; }
        string? password { get; set; }
        string? phoneNumber { get; set; }
        string? token { get; set; }
        ObservableCollection<BaseItem> itemsBelongingToUserId { get; set; }
        string userName { get; set; }

        string ToString();

    }
}