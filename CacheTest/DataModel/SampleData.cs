using IndexedDB.Blazor;
using Microsoft.JSInterop;
using System.ComponentModel.DataAnnotations;

namespace CacheTest.DataModel
{
    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
    }
}
