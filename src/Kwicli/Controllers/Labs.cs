using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Kwicli.Controllers
{
    public class Labs : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Rotator()
        {
            return View("~/Views/Labs/RotatorRoot.cshtml");
        }

        public IActionResult Rotator(int id)
        {
            return View("~/Views/Labs/Rotator.cshtml");
        }
    }
}
