using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;


namespace POCProj
{
	class Program
	{
		static async Task Main(string[] args)
		{
			 var defaultApp = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "firstproj-a007c-firebase-adminsdk-35juy-c3cb03617c.json")),
            });
            Console.WriteLine(defaultApp.Name); // "[DEFAULT]"

            var message = new Message()
            {
                Data = new Dictionary<string, string>()
                {
                    ["FirstName"] = "Hamida",
                    ["LastName"] = "El sheimy"
                },
                Notification = new Notification
                {
                    Title = "Hamida",
                    Body = "Hello"
                },

                Token = "fmWPkfrJXeKRQgn2jGySYC:APA91bGSm_QKs2m7smkgMizsmbbdx3KYbZktHqyqNlB41IFhutv3HAvJ7A16CGZed3_o1i9RRp9FmhHP-WX0JkVzZFZG2UEW7iD2KeNSzIkKuchxP3Qc_sagH1gB4jMD4JgF1SVVxjra",
               // Topic = "news"
            };
            //var messaging = await FirebaseMessaging.DefaultInstance.SendAsync(message);

            var messaging = FirebaseMessaging.DefaultInstance;
            var result = await messaging.SendAsync(message);
            Console.WriteLine(message.Notification); //projects/myapp/messages/2492588335721724324

        }
    }
}
