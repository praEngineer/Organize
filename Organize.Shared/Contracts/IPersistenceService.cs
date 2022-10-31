﻿using Organize.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Organize.Shared.Contracts
{
    public interface IPersistenceService
    {
        Task<IEnumerable<T>> GetAsync<T>(Expression<Func<T, bool>> whereExpression) where T : BaseEntity;
        Task<int> InsertAsync<T>(T entity) where T : BaseEntity;
        Task<int> InsertUserAsync<clsUser>(IforUser entity);
        Task UpdateAsync<T>(T entity) where T : BaseEntity;
        Task DeleteAsync<T>(T entity) where T : BaseEntity;
        Task InitAsync();
        Task<clsUser> AuthenticateAndGetUserAsync(IAuthUser objUser);
        Task GetAsync<T>();
    }
}
