using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VuejsClass.Data;

namespace VuejsClass.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult People()
        {
            return View();
        }
        [HttpPost]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(Properties.Settings.Default.ConStr);
            repo.Add(person);
        }
        [HttpPost]
        public void Edit(Person person)
        {
            var repo = new PeopleRepository(Properties.Settings.Default.ConStr);
            repo.Update(person);
        }
        [HttpPost]
        public void Delete(int id)
        {
            var repo = new PeopleRepository(Properties.Settings.Default.ConStr);
            repo.Delete(id);
        }
        [HttpPost]
        public void DeleteAll(IEnumerable <Person> people)
        {
            foreach(Person p in people)
            {
                Delete(p.Id);
            }
        }
        public ActionResult Get()
        {
            var repo = new PeopleRepository(Properties.Settings.Default.ConStr);
            return Json(repo.GetAll(), JsonRequestBehavior.AllowGet);
        }


    }
}