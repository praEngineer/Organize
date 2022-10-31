using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Organize.Persistence_IndexedDB
{
    class SimplePropertyContractResolver : DefaultContractResolver // avoid complex "columns" in the store/table of IndexedDB child objects like 'organize'
    {
        public SimplePropertyContractResolver()
        {
            NamingStrategy = new CamelCaseNamingStrategy(); // common in javascript to use camel-case
        }

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var property = base.CreateProperty(member, memberSerialization);

            var propertyType = property.PropertyType; // only need to know property type of the member
            var isSimpleProperty = propertyType == typeof(int) || propertyType == typeof(string) ||
                                   propertyType == typeof(decimal) || propertyType == typeof(float) ||
                                   propertyType == typeof(double) || propertyType == typeof(bool) 
                                   || propertyType.IsEnum ;
                                    // Trying to avoid complex types -- only need to serialize tables and other non complex objects.
                                    // Step before creates propertyType.  This final 'or' will be 'true' if the property type matches (IsEnum)
                                    // one of any system types that can be ineumerated
            if (isSimpleProperty)
            {
                property.ShouldSerialize = instance => true;
            }
            else
            {
                property.ShouldSerialize = instance => false;
            }
            return property;
        }
    }
}
