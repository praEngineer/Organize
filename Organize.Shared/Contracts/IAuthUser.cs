namespace Organize.Shared.Contracts
{
    public interface IAuthUser
    {
        string Password { get; set; }
        string UserName { get; set; }
    }
}