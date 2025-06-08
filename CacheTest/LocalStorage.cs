using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace CacheTest
{
    public class LocalStorage
    {
        private const string CultureKey = "culture";

        private readonly ILocalStorageService _localStorageService;

        public string Culture { get; set; }

        public LocalStorage(ILocalStorageService localStorageService)
        {
            _localStorageService = localStorageService;
        }

        public async Task InitializeCultureAsync()
        {
            var culture = await _localStorageService.GetItemAsync<string>(CultureKey);
            if (culture != null)
            {
                Culture = culture;
            }
            else
            {
                Culture = "ko-KR";
                await SaveCultureAsync(Culture);
            }
        }

        public async Task SaveCultureAsync(string culture)
        {
            await _localStorageService.SetItemAsync(CultureKey, culture);
        }

        public async Task<string?> GetCultureAsync()
        {
            return await _localStorageService.GetItemAsync<string?>(CultureKey);
        }
    }
}
