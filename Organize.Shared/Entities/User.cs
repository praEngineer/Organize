using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations; // the square-bracketted decorations, e.g., [Required
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.WebUtilities;
using Organize.Shared.Contracts;
using Organize.Shared.Enums;

namespace Organize.Shared.Entities
{
    public class clsUser : BaseEntity, IforUser
    { //  <DataAnnotationsValidator /> <!--take advantage of user property decorations from System.ComponentModel.DataAnnotations. 

        //public string? uid = null; // = "UID needed"; initializing string treated as an attempt to enter a legitimate user.

        [Required(ErrorMessage ="no UID provided"),StringLength(30, MinimumLength = 3, ErrorMessage = "User ID is unexpected")]
        public string? userName { get; set; } = null; // for validation to work, the property has to be nullable


        [Required(AllowEmptyStrings = false, ErrorMessage = "system needs a dsnyad password")]
        [StringLength(100, MinimumLength = 8,ErrorMessage = "unacceptable password")]
        public string? password { get; set; } = null; // for validation to work, the property has to be nullable

        [Required(AllowEmptyStrings = false, ErrorMessage = "You must provide a given name")] // "required" means is not null
        public string? firstName { get; set; } = null; // for validation to work, the property has to be nullable

        [Required(AllowEmptyStrings = false, ErrorMessage = "You must provide a sur name")]
        public string? lastName { get; set; } = null; // for validation to work, the property has to be nullable

        [Required(AllowEmptyStrings = false, ErrorMessage = "You must provide a phone number")]
        [Phone]
        [RegularExpression("^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
        public string? phoneNumber { get; set; } = null; // for validation to work, the property has to be nullable

        public GenderTypeEnum genderType { get; set; }

        public bool isUserItemsPropertyLoaded { get; set; } = true; // true because no items is legitimate for new user
        // Property is only false when there is a problem with CRUD of item for this user.

        public ObservableCollection<BaseItem> itemsBelongingToUserId
        {
            get => _userItems;
            set => SetProperty(ref _userItems, value);
        }
        private ObservableCollection<BaseItem> _userItems = new();

        public void eraseItemsBelongingToUserId()
        {
            _userItems.Clear();
        }

        public string? token { get; set; }

        public override string ToString()
        {
            var salutation = string.Empty;
            if (genderType == GenderTypeEnum.Male)
            {
                salutation = "Mr";
            }

            if (genderType == GenderTypeEnum.Female)
            {
                salutation = "Mrs";
            }

            return $"{salutation}. {firstName} {lastName}";
        }

        public clsUser Clone()
        {
            // Create a new clsUser object
            clsUser clone = new();

            // Copy private data from this to clone

            clone.id = this.id;
            clone.userName = this.userName;
            clone.password = this.password;
            clone.firstName = this.firstName;
            clone.lastName = this.lastName;

            clone.isUserItemsPropertyLoaded = this.isUserItemsPropertyLoaded;
            clone.phoneNumber = this.phoneNumber;
            clone.genderType = this.genderType;
            clone._userItems = this._userItems;
            clone.itemsBelongingToUserId = this.itemsBelongingToUserId;

            // Return the new clsUser object containing the copied data
            return clone;
        }
    }
}
