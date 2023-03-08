const express = require("express");
const { Blob } = require("buffer");
const fileUpload = require("express-fileupload");
const con = require("./config");
const app = express();
app.use(fileUpload());

// file upload

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static("public"));

app.post("/admin/dashboard", (req, res) => {
  con.query(
    "SELECT id FROM `users` WHERE `status`='Active' ",
    function (error, results, fields) {
      
      var students = results.length;

      con.query(
        "SELECT id FROM `admin` WHERE `status`='Active' ",
        function (e, r, f) {
          
          var admin = r.length;

          con.query(
            "SELECT id FROM `courses` WHERE `status`!='Deleted' ",
            function (e, r, f) {
           
              var courses = r.length;

              con.query(
                "SELECT id FROM `course_category` ",
                function (e, r, f) {
              
                  var category = r.length;

                  con.query("SELECT id FROM `contacts` ", function (e, r, f) {
               
                    var contacts = r.length;
                    var result = [
                      {
                        students: students,
                        users: admin,
                        courses: courses,
                        category: category,
                      },
                    ];

                    res.json({ message: "Success", result: result });
                  });
                }
              );
            }
          );
        }
      );
      if (!error) {
      } else {
        console.log(error);
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  con.query(
    "SELECT * FROM `users` WHERE `email`=? and `password`=? ",
    [email, password],
    function (error, results, fields) {
      res.json({ result: results });
    }
  );
});
// register ------------------>>>>>>>
app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  con.query(
    "SELECT * FROM `users` WHERE `email`=?",
    [email],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: "Already account exists" });
      } else {
        con.query(
          "INSERT INTO `users` SET `name`=? , `email`=? , `password`=? ",
          [name, email, password]
        );
        con.query(
          "SELECT * FROM `users` WHERE `email`=? and `password`=? ",
          [email, password],
          function (error, res2, fields) {
            res.json({ result: res2 });
          }
        );
      }
    }
  );
});

app.post("/admin/course/get-single", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT * FROM `courses` WHERE `status`!='Deleted' and `id`=? order by id desc ",
    [id],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/singlePost", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  res.send(email);
  // con.query('SELECT * FROM `posts` WHERE `author`=? and `title`=? order by `id` desc limit 1', [author, title], function (error, results, fields) {
  //     console.log(results);
  //     res.send(results);
  // });
});

app.post("/user/", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "SELECT name FROM `users` WHERE `id`=?",
    [uid],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: uid + "", message: "Failed :: UID " + uid });
      }
    }
  );
  // res.json({ "result": uid, "message": "Success" });
});
app.post("/course/assign", (req, res) => {
  const user_id = req.body.user_id;
  const course_id = req.body.course_id;
  var date = new Date();
  var ndate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  var time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
console.log(user_id);
console.log(course_id);
  con.query(
    "SELECT * FROM `course_transactions` WHERE `course_id`=? and `user_id`=? and `status`='Active' ",
    [course_id, user_id],
    function (e, r, f) {
      console.log(r.length);
      if (r.length > 0) {
        res.json({ status: "Success" });
      } else {
        con.query(
          "INSERT INTO `course_transactions` SET `course_id`=?,`user_id`=?, `status`='Active',`date`=?,`time`=?,`progress`='0' ",
          [course_id, user_id, ndate, time],
          function (error, results, fields) {
            if (error != null) {
              console.log(error);
              res.json({ status: "Failed" });
            } else {
              res.json({ status: "Success" });
            }
          }
        );
      }
    }
  );
});

app.post("/course/my-courses", (req, res) => {
  const user_id = req.body.user_id;
  // console.log("USER ID " + user_id)
  con.query(
    "SELECT * FROM `course_transactions` WHERE `user_id`=? ",
    [user_id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

app.post("/course/my-courses-cid", (req, res) => {
  const course_id = req.body.course_id;
  con.query(
    "SELECT * FROM `courses` WHERE `id`=? ",
    [course_id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

app.post("/course/my-course/progress", (req, res) => {
  const user_id = req.body.user_id;
  const course_id = req.body.course_id;
  // console.log("USER ID " + user_id)

  con.query(
    "SELECT * FROM `course_transactions` WHERE `user_id`=? and `course_id`=? ",
    [user_id, course_id],
    function (error, results, fields) {
      console.log(results);
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

app.post("/course/my-courses/transaction", (req, res) => {
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;
  con.query(
    "SELECT * FROM `course_transactions` WHERE `course_id`=? and `user_id`=? ",
    [course_id, user_id],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ status: "Success", result: results });
      } else {
        console.log("ERROR" + error);
        res.json({ status: "Failed" });
      }
    }
  );
});

app.post("/course/my-courses/single", (req, res) => {
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;
  con.query(
    "SELECT * FROM `course_transactions` WHERE `course_id`=? and `user_id`=? ",
    [course_id, user_id],
    function (error, results, fields) {
      console.log(results);
      if (results.length > 0) {
        con.query(
          "SELECT * FROM `courses` WHERE `id`=?",
          [course_id],
          function (e, rs, field) {
            if (rs.length > 0) {
              res.json({ status: "Success", result: rs });
            } else {
              res.json({ status: "Failed" });
            }
          }
        );
      } else {
        console.log("ERROR" + error);
        res.json({ status: "Failed" });
      }
    }
  );
});

app.post("/course/my-courses-cid/chapters", (req, res) => {
  const course_id = req.body.course_id;
  con.query(
    "SELECT * FROM `chapters` WHERE `course_id`=? ",
    [course_id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

app.post("/course/my-courses-content", (req, res) => {
  const course_id = req.body.course_id;
  const chapter = req.body.chapter;
  con.query(
    "SELECT * FROM `contents` WHERE `course_id`=? and `chapter`=? ",
    [course_id, chapter],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

app.post("/course/my-play-content", (req, res) => {
  const course_id = req.body.course_id;
  const id = req.body.id;
  con.query(
    "SELECT * FROM `contents` WHERE `course_id`=? and `id`=? ",
    [course_id, id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

app.post("/course/my-play-content/transactions", (req, res) => {
  const course_id = req.body.course_id;
  const id = req.body.id;
  const uid = req.body.uid;
  con.query(
    "SELECT * FROM `content_transactions` WHERE `course_id`=? and `content_id`=? and `user_id`=? ",
    [course_id, id, uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

app.post("/course/my-next-play-content", (req, res) => {
  const course_id = req.body.course_id;
  const id = req.body.id;
  con.query(
    "SELECT * FROM `contents` WHERE `course_id`=? and `id`>? order by id asc",
    [course_id, id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success", result: results });
      }
    }
  );
});

// app.post("/course/my-play-content/update", (req, res) => {
//   const course_id = req.body.course_id;
//   const uid = req.body.user_id;
//   const id = req.body.id;
//   const progress = Math.round(req.body.progress);
//   const mins = req.body.mins;

//   con.query(
//     "SELECT id, reading_time FROM `contents` WHERE `course_id`=?",
//     [course_id],
//     function (e, r, f) {
//       var rTime = 0;
//       for (var x = 0; x < r.length; x++) {
//         rTime = parseInt(rTime) + parseInt(r[x].reading_time);
//       }
//       console.log("Progress :: " + progress);
//       // console.log("Total contents " + r.length)
//       var prog = 60;
//       con.query(
//         "SELECT * FROM `content_transactions` WHERE `course_id`=? and `user_id`=? and `progress`>?",
//         [course_id, uid, prog],
//         function (er, rr, fr) {
//           // console.log(rr)
//           console.log(
//             "Reading completed :: " + id + " :: " + rr.length + "/" + r.length
//           );

//           var prc = Math.round((rr.length / r.length) * 100);
//           console.log(
//             "Completed Percentage :: Course Id: " +
//             course_id +
//             " Per: " +
//             prc +
//             "%   UID:: " +
//             uid +
//             "  contentId:" +
//             id +
//             " Mins " +
//             mins
//           );
//           con.query(
//             "UPDATE `course_transactions` SET `progress`=? WHERE `course_id`=? and `user_id`=? ",
//             [prc, course_id, uid],
//             function (eee, rrr, fff) {
//               if (!eee) {
//                 // console.log("updating course_transactions table " + eee)
//               } else {
//                 // console.log("error on updating course_transactions table " + eee)
//               }
//             }
//           );
//         }
//       );
//     }
//   );

//   con.query(
//     "SELECT progress FROM `content_transactions` WHERE `course_id`=? and `user_id`=? and `content_id`=?  ",
//     [course_id, uid, id],
//     function (er, rr, fr) {
//       // console.log("Server :: " + rr[0].progress)
//       if (parseInt(progress) > parseInt(rr[0].progress)) {
//         con.query(
//           "UPDATE `content_transactions` SET `progress`=?, `mins`=? WHERE `course_id`=? and `content_id`=? and `user_id`=? ",
//           [progress, mins, course_id, id, uid],
//           function (error, results, fields) {
//             if (error != null) {
//               console.log("Error 220 :: " + uid);
//               res.json({ status: "Failed" });
//             } else {
//               res.json({ status: "Success" });
//             }
//           }
//         );
//       } else {
//         // console.log("Progress 227 ::: " + progress + "/" + rr[0].progress)
//         res.json({ status: "Success" });
//       }
//     }
//   );
// });

app.post("/course/my-play-content/assign", (req, res) => {
  const course_id = req.body.course_id;
  const id = req.body.id;
  const uid = req.body.uid;
  var date = new Date();
  var ndate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  var time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  // console.log("UID :: " + uid, "  course_id " + course_id, "  contentId " + id)

  con.query(
    "SELECT * FROM `content_transactions` WHERE `course_id`=? and `content_id`=? and `user_id`=? ",
    [course_id, id, uid],
    function (err, rxs, fl) {
      if (rxs[0] === undefined || rxs.length < 1) {
        // console.log(' Satisfying second condition' + err)
        con.query(
          "INSERT INTO `content_transactions` SET `course_id`=?, `content_id`=?,`user_id`=?, `status`='Active',`date`=?,`time`=?, `progress`='0',`tmp_progress`='0',`mins`='0',`done_mins`='0' ",
          [course_id, id, uid, ndate, time],
          function (error, results, fields) {
            // console.log("Second Log " + error)
            if (error != null) {
              res.json({ status: "Failed" });
            } else {
              res.json({ status: "Success" });
            }
          }
        );
      } else {
        // console.log("Data not loaded " + rxs)
        res.json({ status: "Success" });
      }
    }
  );
});

////////////////////// Admin ////////////////////////

app.post("/admin/course/weeks", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT * FROM `chapters` WHERE `course_id`=? order by id asc ",
    [id],
    function (error, results, fields) {
      if (!error) {
        res.json({ result: results, message: "Success" });
      } else {
        console.log(error);
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/weeks/add", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const duration = req.body.duration;

  con.query(
    "INSERT INTO `chapters` SET `course_id`=? ,`title`=?, `duration`=? ",
    [id, title, duration],
    function (error, results, fields) {
      if (!error) {
        res.json({ message: "Success" });
      } else {
        console.log(error);
        res.json({ message: "Failed" });
      }
    }
  );
});
app.post("/admin/weeks/delete", (req, res) => {
  const id = req.body.id;

  con.query(
    "DELETE FROM `chapters` WHERE  `id`=? ",
    [id],
    function (error, results, fields) {
      if (!error) {
        res.json({ message: "Success" });
      } else {
        console.log(error);
        res.json({ message: "Failed" });
      }
    }
  );
});

app.post("/admin/course/add-content", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const content = req.body.content;
  const type = req.body.type;
  const chapter = req.body.chapter;
  const reading_time = req.body.reading_time;

  if (type === "Video Content" || type === "PDF Content") {
    const file = req.files.content;
    const thumbnail = Date.now() + file.name;
    const date = Date.now();

    file.mv(
      `${__dirname}/admin_dashboard/public/uploads/${thumbnail}`,
      (err) => {
        if (err) {
          console.error(err);
          // return res.status(500).send(err);
          res.json({ message: "Failed" });
        } else {
          con.query(
            "INSERT INTO `contents` SET `course_id`=? ,`title`=?, `chapter`=?,`content`=?,`type`=?,`status`='Live',`reading_time`=? ",
            [id, title, chapter, thumbnail, type, reading_time],
            function (error, results, fields) {
              console.log("ERROR" + error);
              if (!error) {
                res.json({ message: "Success" });
              } else {
                console.log(error);
                res.json({ message: "Failed" });
              }
            }
          );
        }
      }
    );
  } else {
    con.query(
      "INSERT INTO `contents` SET `course_id`=? ,`title`=?, `chapter`=?,`content`=?,`type`=?,`status`='Live',`reading_time`=? ",
      [id, title, chapter, content, type, reading_time],
      function (error, results, fields) {
        console.log("ERROR" + error);
        if (!error) {
          res.json({ message: "Success" });
        } else {
          console.log(error);
          res.json({ message: "Failed" });
        }
      }
    );
  }
});

app.post("/admin/course/contents", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT * FROM `contents` WHERE `course_id`=? order by id asc ",
    [id],
    function (error, results, fields) {
      if (!error) {
        res.json({ result: results, message: "Success" });
      } else {
        console.log(error);
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/course/contents/delete", (req, res) => {
  const id = req.body.id;

  con.query(
    "DELETE FROM `contents` WHERE  `id`=? ",
    [id],
    function (error, results, fields) {
      if (!error) {
        res.json({ message: "Success" });
      } else {
        console.log(error);
        res.json({ message: "Failed" });
      }
    }
  );
});

app.post("/admin/course/enrolled", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT * FROM `course_transactions` WHERE `course_id`=? order by id asc ",
    [id],
    function (error, results, fields) {
      if (!error) {
        res.json({ result: results, message: "Success" });
      } else {
        console.log(error);
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/course/student-single", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT id,name,designation FROM `users` WHERE `id`=? order by id asc ",
    [id],
    function (error, results, fields) {
      console.log("Error on single user ", error);
      if (!error) {
        res.json({ result: results, message: "Success" });
      } else {
        console.log(error);
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/certificate_post/update", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file selected" });
  }

  const course_id = req.body.course_id;
  const uid = req.body.uid;
  const file = req.files.thumbnail;
  const thumbnail = Date.now() + file.name;
  const date = Date.now();

  file.mv(
    `${__dirname}/admin_dashboard/public/uploads/certificates/${thumbnail}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else {
        con.query(
          "UPDATE `course_transactions` SET `certificate_uploaded`='Yes',`certificate`=? WHERE `course_id`=? and `user_id`=?  ",
          [thumbnail, course_id, uid]
        );
        res.json({ fileName: thumbnail, status: "Success" });
      }
    }
  );
});

app.post("/admin/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  con.query(
    "SELECT * FROM `admin` WHERE `email`=? and `password`=?",
    [email, password],
    function (error, results, fields) {
      res.json({ result: results, msg: "Success" });
    }
  );
});

app.post("/admin/reset/password", (req, res) => {
  const email = req.body.email;
  // console.log(req.body);
  con.query(
    "SELECT * FROM `admin` WHERE `email`=? ",
    [email],
    function (error, results, fields) {
      // res.json({ result: results, msg: "Success" })
      // console.log(results.length);
      if (results.length > 0) {
        res.json({ message: "Success" });
      } else {
        res.json({ message: "Failed" });
      }
    }
  );

  // const nodemailer = require('nodemailer');
  //   let transporter = nodemailer.createTransport({
  //          host: 'smtp.mailtrap.io',
  //          port: 2525,
  //          auth: {
  //              user: "<user>",
  //              pass: "<pass>"
  //          }
  //  })
});

app.post("/admin/category/", (req, res) => {
  const title = req.body.title;
  const action = req.body.action;
  con.query(
    "INSERT INTO `course_category` SET title=?",
    [title],
    function (err, rs, f) { }
  );

  con.query(
    "SELECT * FROM `course_category` order by title asc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: uid + "", message: "Failed " + title });
      }
    }
  );
});

app.post("/admin/category/get", (req, res) => {
  const action = req.body.action;
  con.query(
    "SELECT * FROM `course_category` order by title asc ",
    function (error, results, fields) {
      if (results != undefined && results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/category/delete", (req, res) => {
  const action = req.body.action;
  const id = req.body.id;
  con.query(
    "DELETE FROM `course_category` WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (error) {
        res.json({ result: "error" + "", message: "Failed" });
      } else {
      }
    }
  );
});

app.post("/admin/categories/get", (req, res) => {
  const action = req.body.action;
  con.query(
    "SELECT * FROM `course_category` order by rand() limit 5",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/categories/get/all", (req, res) => {
  const action = req.body.action;
  con.query(
    "SELECT * FROM `course_category` order by title asc",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/course/get", (req, res) => {
  const action = req.body.action;
  con.query(
    "SELECT * FROM `courses` WHERE `status`!='Deleted' order by id desc ",
    function (error, results, fields) {
      if (results != undefined && results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/course/get-by-category", (req, res) => {
  const action = req.body.action;
  const category = req.body.category;
  con.query(
    "SELECT * FROM `courses` WHERE `status`!='Deleted' and `category`=? order by id desc ",
    [category],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/course/get-by-query", (req, res) => {
  const action = req.body.action;
  const query = req.body.query;
  con.query(
    "SELECT * FROM `courses` WHERE `status`!='Deleted' and (`title` like ? ) order by id desc ",
    ["%" + query + "%"],
    function (error, results, fields) {
      console.log("Error 564" + error);
      console.log("Error 564" + fields);
      console.log("Error 564" + results);

      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});
app.post("/admin/course/trashed", (req, res) => {
  const action = req.body.action;
  con.query(
    "SELECT * FROM `courses` WHERE `status`='Deleted' order by id desc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/post/add", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file selected" });
  }
  const uid = req.body.uid;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const author = req.body.author;
  const file = req.files.file;
  const thumbnail = Date.now() + file.name;
  const date = Date.now();

  file.mv(`${__dirname}/admin_dashboard/public/uploads/${thumbnail}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else {
      con.query(
        "INSERT INTO `courses` SET `title`=?,`description`=?,`thumbnail`=?,`category`=?,`price`=?,`uid`=?,`date`=?,`author`=?,`status`='Active' ",
        [title, description, thumbnail, category, price, uid, date, author]
      );
      res.json({
        fileName: thumbnail,
        filePath: `/uploads/${thumbnail}`,
        status: "Success",
      });
    }
  });
});

app.post("/admin/post/update", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file selected" });
  }
  const uid = req.body.uid;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const cid = req.body.cid;
  const file = req.files.file;
  const thumbnail = Date.now() + file.name;
  const date = Date.now();

  file.mv(`${__dirname}/admin_dashboard/public/uploads/${thumbnail}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else {
      con.query(
        "UPDATE `courses` SET `title`=?,`description`=?,`thumbnail`=?,`category`=?,`price`=?,`uid`=? WHERE `id`=? ",
        [title, description, thumbnail, category, price, uid, cid]
      );
      res.json({
        fileName: thumbnail,
        filePath: `/uploads/${thumbnail}`,
        status: "Success",
      });
    }
  });
});

app.post("/admin/course/delete", (req, res) => {
  const id = req.body.id;
  con.query(
    "UPDATE `courses` SET `status`='Deleted' WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});

app.post("/admin/course/recover", (req, res) => {
  const id = req.body.id;
  con.query(
    "UPDATE `courses` SET `status`='Pending' WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
app.post("/admin/course/p-delete", (req, res) => {
  const id = req.body.id;
  con.query(
    "DELETE FROM `courses` WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});

app.post("/admin/users/get", (req, res) => {
  con.query(
    "SELECT * FROM `admin` WHERE `status`='Active' order by id desc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});
app.post("/admin/users/trashed", (req, res) => {
  con.query(
    "SELECT * FROM `admin` WHERE `status`!='Active' order by id desc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});
app.post("/admin/users/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const rank = req.body.rank;

  con.query(
    "INSERT INTO `admin` SET `name`=?,`email`=?,`phone`=?,`password`=?,`rank`=?,`status`='Active' ",
    [name, email, phone, password, rank],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
app.post("/admin/users/delete", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "UPDATE `admin` SET `status`='Deleted' WHERE `id`=? ",
    [uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
// recover users
app.post("/admin/users/recover", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "UPDATE `admin` SET `status`='Active' WHERE `id`=? ",
    [uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
// parmanently delete user
app.post("/admin/users/delete-parmanantly", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "DELETE FROM `admin` WHERE `id`=? ",
    [uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});

app.post("/admin/students/get", (req, res) => {
  con.query(
    "SELECT name,email,id FROM `users` WHERE `status`='Active' order by id desc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});
app.post("/admin/courses/getcourse", (req, res) => {
  const id = req.body.user_id;
  con.query(
    `SELECT * FROM \`course_transactions\` WHERE \`status\`='Active' order by id desc `,
    function (error, results, fields) {
      if (!error) {
        res.json({ result: results, status: "success" });
      } else {
        console.log(error);
        res.json({ result: "error" + "", status: "failed" });
      }
    }
  );
});

app.post("/admin/students/trashed", (req, res) => {
  con.query(
    "SELECT * FROM `users` WHERE `status`!='Active' order by id desc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});
app.post("/admin/student/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const rank = req.body.rank;

  con.query(
    "INSERT INTO `users` SET `name`=?,`email`=?,`phone`=?,`password`=?,`designation`=?,`status`='Active' ",
    [name, email, phone, password, rank],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
app.post("/admin/student/delete", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "UPDATE `users` SET `status`='Deleted' WHERE `id`=? ",
    [uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
// // recover users
app.post("/admin/students/recover", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "UPDATE `users` SET `status`='Active' WHERE `id`=? ",
    [uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
// // parmanently delete user
// app.post("/admin/users/delete-parmanantly", (req, res) => {
//     const uid = req.body.uid;
//     con.query("DELETE FROM `admin` WHERE `id`=? ", [uid], function (error, results, fields) {
//         if (error != null) {
//             res.json({ status: "Failed" });
//         } else {
//             res.json({ status: "Success" });
//         }
//     });
// })

app.post("/user/userInfo", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "SELECT * FROM `users` WHERE `id`=? ",
    [uid],
    function (error, results, fields) {
      console.log(results);
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/contacts/get", (req, res) => {
  con.query(
    "SELECT * FROM `contacts` WHERE `status`='Pending' order by id desc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/contacts/single", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT * FROM `contacts` WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/contacts/delete", (req, res) => {
  const id = req.body.id;
  con.query(
    "UPDATE `contacts` SET `status`='Deleted' WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});

app.post("/admin/contacts/get/trashed", (req, res) => {
  con.query(
    "SELECT * FROM `contacts` WHERE `status`='Deleted' order by id desc ",
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/userInfo", (req, res) => {
  const uid = req.body.uid;
  con.query(
    "SELECT * FROM `admin` WHERE `id`=? ",
    [uid],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/user/update", (req, res) => {
  const uid = req.body.uid;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  con.query(
    "UPDATE `admin` SET `name`=?,`email`=?,`phone`=? WHERE `id`=? ",
    [name, email, phone, uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});
app.post("/admin/user/update/password", (req, res) => {
  const uid = req.body.uid;
  const npass = req.body.npass;

  con.query(
    "UPDATE `admin` SET `password`=?  WHERE `id`=? ",
    [npass, uid],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});

// admin settings update
app.post("/admin/general/settings", (req, res) => {
  const title = req.body.title;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;
  const linkedin = req.body.linkedin;
  const twitter = req.body.twitter;
  const whatsapp = req.body.whatsapp;
  const youtube = req.body.youtube;

  console.log(req.body);

  con.query(
    "UPDATE `company` SET `name`=?,`address`=?,`phone`=?,`email`=?,`facebook`=?,`instagram`=?,`linkedin`=?,`twitter`=?,`whatsapp`=?,`youtube`=? WHERE `id`=? ",
    [
      title,
      address,
      phone,
      email,
      facebook,
      instagram,
      linkedin,
      twitter,
      whatsapp,
      youtube,
      "1",
    ],
    function (error, results, fields) {
      console.log(error);
      res.json({ result: results, msg: "Success" });
    }
  );
});

app.post("/admin/company", (req, res) => {
  const action = req.body.action;
  con.query(
    "SELECT * FROM `company` WHERE `id`=? order by id desc ",
    ["1"],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/settings/gateway", (req, res) => {
  const action = req.body.action;
  con.query(
    "SELECT * FROM `gateway` WHERE `provider`=? order by id desc ",
    ["razorpay"],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/settings/gateway-update", (req, res) => {
  const api = req.body.api;
  const secret = req.body.secret;
  const provider = req.body.provider;

  con.query(
    "UPDATE `gateway` SET `api`=?,`secret`=?  WHERE `provider`=? ",
    [api, secret, provider],
    function (error, results, fields) {
      console.log(error);
      res.json({ result: results, msg: "Success" });
    }
  );
});

app.post("/admin/exam/add", (req, res) => {
  const title = req.body.title;
  const full_marks = req.body.full_marks;
  const duration = req.body.duration;
  const course_id = req.body.course_id;
  const etype = req.body.etype;
  const question_count = req.body.question_count;


  
  const date = Date.now();
  
  con.query(
    "INSERT INTO `exams` SET `title`=?,`full_marks`=?,`duration`=?,`course_id`=?,`etype`=?,`question_count`=?,`date`=?,`passsing_marks`='80',`status`='Pending'",
    [title, full_marks, duration, course_id,etype, question_count, date],
    function (error, results, fields) {
      if (!error) {
        res.json({ status: "Success" });
      } else {
        console.log(error);
        res.json({ status: "Failed" });
      }
    }
  );
});

app.post("/admin/exams/get", (req, res) => {
  const action = req.body.action;
  var student;

  const query1 = `SELECT id, name FROM users`;

  con.query(query1, (err, result) => {
    if (err) {
      res.status(500).send({ status: "failure" });
    } else {
      student = result;
      con.query(
        "SELECT * FROM `exams` WHERE `status`!='Deleted' order by id desc ",
        function (error, results, fields) {
          if (results.length > 0) {
            res.json({ result: results,user:student, message: "Success" });
          } else {
            res.json({ result: "error" + "", message: "Failed" });
          }
        }
      );
    }
  });





});

app.post("/admin/exam/delete", (req, res) => {
  const id = req.body.id;
  con.query(
    "UPDATE `exams` SET `status`='Deleted' WHERE `id`=? ",
    [id],
    function (error, results, fields) {
      if (error != null) {
        res.json({ status: "Failed" });
      } else {
        res.json({ status: "Success" });
      }
    }
  );
});

app.post("/admin/exam/get-single", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT * FROM `exams` WHERE `status`!='Deleted' and `id`=? order by id desc ",
    [id],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/admin/question/add-question", (req, res) => {
  const question = req.body.question;
  const a = req.body.a;
  const b = req.body.b;
  const c = req.body.c;
  const d = req.body.d;
  const etype = req.body.etype;
  const correct = req.body.correct;
  const marks = req.body.marks;
  const exam_id = req.body.exam_id;
  const course_id = req.body.course_id;
  console.log("lmao");
  console.log(req.body);
  con.query(
    "INSERT INTO `questions` SET `question`=?,`a`=?,`b`=?,`c`=?,`d`=?,`etype`=?,`correct`=?,`marks`=?,`exam_id`=?,`course_id`=?,`status`='Pending' ",
    [question, a, b, c, d,etype, correct, marks, exam_id, course_id],
    function (error, results, fields) {
      if (!error) {
        res.json({ status: "Success" });
      } else {
        console.log(error);
        res.json({ status: "Failed" });
      }
    }
  );
});
app.post("/admin/exam/question/delete", (req, res) => {
  const id = req.body.id;

  con.query(
    "DELETE FROM `questions` WHERE  `id`=? ",
    [id],
    function (error, results, fields) {
      if (!error) {
        res.json({ message: "Success" });
      } else {
        console.log(error);
        res.json({ message: "Failed" });
      }
    }
  );
});

app.post("/admin/exam/questions", (req, res) => {
  const exam_id = req.body.id;
  con.query(
    "SELECT * FROM `questions` WHERE `exam_id`=?  order by id asc ",
    [exam_id],
    function (error, results, fields) {
      if (!error) {
        res.json({ result: results, message: "Success" });
      } else {
        console.log(error);
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});

app.post("/course/my-courses/exams", (req, res) => {
  const course_id = req.body.course_id;
  con.query(
    "SELECT * FROM `exams` WHERE `course_id`=? order by id asc ",
    [course_id],
    function (error, results, fields) {
      if (!error) {
        res.json({ result: results, status: "Success" });
      } else {
        console.log(error);
        res.json({ result: "error" + "", status: "Failed" });
      }
    }
  );
});

app.post("/admin/exam/question/get-single", (req, res) => {
  const id = req.body.id;
  con.query(
    "SELECT * FROM `questions` WHERE `status`!='Deleted' and `id`=? order by id desc ",
    [id],
    function (error, results, fields) {
      if (results.length > 0) {
        res.json({ result: results, message: "Success" });
      } else {
        res.json({ result: "error" + "", message: "Failed" });
      }
    }
  );
});
app.post("/admin/exam/question", (req, res) => {
  const exam_id = req.body.id;
  const q_id = req.body.q_id;
  if (q_id === undefined || q_id === null || q_id === "") {
    con.query(
      "SELECT * FROM `questions` WHERE `exam_id`=?  order by id asc limit 1", 
      [exam_id],
      function (error, results, fields) {
        if (!error) {
          // console.log(results);
          res.json({ result: results, message: "Success" });
        } else {
          console.log(error);
          res.json({ result: "error" + "", message: "Failed" });
        }
      }
    );
  } else {
    con.query(
      "SELECT * FROM `questions` WHERE `exam_id`=? and id>? order by id asc limit 1",
      [exam_id, q_id],
      function (error, results, fields) {
        if (!error) {
          res.json({ result: results, message: "Success" });
          // console.log(results);
        } else {
          console.log(error);
          res.json({ result: "error" + "", message: "Failed" });
        }
      }
    );
  }
});

app.post("/admin/question/update-question", (req, res) => {
  const id = req.body.id;
  const question = req.body.question;
  const a = req.body.a;
  const b = req.body.b;
  const c = req.body.c;
  const d = req.body.d;
  const correct = req.body.correct;
  const marks = req.body.marks;
  con.query(
    "UPDATE `questions` SET `question`=?,`a`=?,`b`=?,`c`=?,`d`=?,`correct`=?,`marks`=? WHERE `id`=?",
    [question, a, b, c, d, correct, marks, id],
    function (error, results, fields) {
      if (!error) {
        res.json({ status: "Success" });
      } else {
        console.log(error);
        res.json({ status: "Failed" });
      }
    }
  );
});

app.post("/exam/send-ans", (req, res) => {
  const question = req.body.question;
  const correct = req.body.correct;
  const marks = req.body.marks;
  const que_id = req.body.que_id;
  const exam_id = req.body.exam_id;
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;
  const answer = req.body.answer;
  var date = new Date();
  var ndate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  var time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  con.query(
    "INSERT INTO `exam_transactions` SET `question`=?,`correct`=?,`marks`=?,`que_id`=?, `exam_id`=?,`course_id`=?, `user_id`=?,`answer`=?, `date`=?, `time`=?, `status`='Pending', `answered`= 1 ",
    [
      question,
      correct,
      marks,
      que_id,
      exam_id,
      course_id,
      user_id,
      answer,
      date,
      time,
    ],
    function (error, results, fields) {
      if (!error) {
        con.query(
          "SELECT * from `questions` where `exam_id`=? and `course_id`=? and `id`>?  ",
          [exam_id, course_id, que_id],
          function (error2, result2, firlds2) {
            // console.log(result2);
            res.json({ status: "Success", result: result2 });
          }
        );
      } else {
        console.log(error);
        res.json({ status: "Failed" });
      }
    }
  );
});

app.post("/admin/course/content_transaction",(req,res)=>{
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;
  const content_id = req.body.id;
  console.log(req.body.course_id);
  console.log(req.body.user_id);
  console.log(req.body.id);
 
  const mins = req.body.mins;

  // SQL query to retrieve done_mins from content_transaction table
  const sqlQuery = `SELECT done_mins FROM content_transactions 
                    WHERE course_id = '${course_id}' AND user_id = '${user_id}' AND content_id = '${content_id}'`;

  // execute the SQL query and return the result
  con.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: "failure" });
    } else {
      let done_mins = result[0]?.done_mins; // Use optional chaining to check if done_mins is undefined

      if (done_mins === undefined) {
        // If done_mins is undefined, insert a new row in the content_transactions table
        const insertQuery = `INSERT INTO content_transactions (course_id, user_id, content_id, done_mins) 
                              VALUES ('${course_id}', '${user_id}', '${content_id}', 0)`;
        con.query(insertQuery, (err, result) => {
          if (err) {
            console.log(err);
            res.json({ status: "failure" });
          } else {
            done_mins = 0; // Set done_mins to 0
            console.log(result);
            res.json({ status: "Success", result: done_mins });
          }
        });
      } else {
        console.log(result);
        res.json({ status: "Success", result: done_mins });
      }
    }
  });
});


app.post('/admin/course/content_transaction/done_minutes/:uid/:course/:content', (req, res) => {
  const query = `UPDATE content_transactions SET done_mins=${req.body.readtime}
    WHERE user_id=${req.params.uid} AND content_id=${req.params.content}
    AND course_id=${req.params.course}`;
    console.log(req.body.readtime);
   
  con.query(query, (err, result) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.status(200).send({
      result:"success"
    });
  });
});
app.post('/exam/assessment/send', (req, res) => {
  const user_id = req.body.user_id; 
  const course_id = req.body.course_id; 
  const exam_id = req.body.exam_id; 
  const file = req.files.file;
  const name = file.name
 
 
 
  
  file.mv(`${__dirname}/admin_dashboard/public/uploads/assessment/${(name+user_id+".pdf")}`)
  const query = `INSERT INTO assessments (examid, courseid, userid, name) values ('${exam_id}', '${course_id}', '${user_id}', '${(name+user_id+".pdf")}')`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ result: "failure" });
    } else {
      res.status(200).send({ result: "success" });
    }
  });
});

app.post('/exam/assessment/get', (req, res) => {
  const user_id = req.body.user_id; 
  const course_id = req.body.course_id; 
  const exam_id = req.body.exam_id; 
 
  const query = `SELECT name FROM assessments WHERE examid='${exam_id}' AND courseid='${course_id}' AND userid='${user_id}'`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ status: "failure" });
    } else {
      if (result.length === 0) {
        res.status(404).send({ status: "failure", message: "Course not found" });
      } else {
        res.status(200).send({ status: "success", result: result[0].name });
      }
    }
  });
  
});
app.post('/users/get', (req, res) => {
  const query = `SELECT id, name FROM users`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ status: "failure" });
    } else {
      res.status(200).send({ status: "success", result: result });
    }
  });
});

app.post('/exam/assessment/approve', (req, res) => {
  const user_id = req.body.user_id; 
  const course_id = req.body.course_id; 
  const exam_id = req.body.exam_id; 
 
  const query = `UPDATE assessments SET status = 'approved' WHERE examid='${exam_id}' AND courseid='${course_id}' AND userid='${user_id}'`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ status: "failure" });
    } else {
      res.status(200).send({ status: "success" });
    }
  });
});



app.post('/admin/course/content_transaction/progress_total/', (req, res) => {
   var assessment = 2;
  const course_id = req.body.course_id;
  const user_id = req.body.user_id;
  const query = `SELECT SUM(done_mins) as total_mins
  FROM content_transactions
  WHERE user_id = ${user_id} AND course_id = ${course_id} AND status='active'`;
  const query1 = `SELECT SUM(reading_time) as total_reading_time FROM contents WHERE course_id = ${course_id}`;
  const query2 = `SELECT 
  COUNT(*) = SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS all_approved FROM  assessments WHERE userid = '${user_id}' AND courseid = '${course_id}'`


  con.query(query2, (err, result) => {
    if (err) {
      console.log(err);
    }
    else{

      console.log(result);

   if(result[0].all_approved==1)
   {
    assessment=1;
   }
   else{
    assessment=0;
   }

    }
  });


console.log(assessment);

   
  con.query(query1, (err, result1) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    

    con.query(query, (err, result) => {
      if (err) {
        res.status(400).send("Something went wrong!");
      }
      if(assessment==1)
      {
        res.status(200).send({ status: "success", result: result[0].total_mins , total_time: result1[0].total_reading_time })
      }
      if(assessment==0)
      {
        res.status(200).send({ status: "success", result: result[0].total_mins*0.90 , total_time: result1[0].total_reading_time })
      }
      if(assessment==2)
      {
        res.status(200).send({ status: "success", result: result[0].total_mins , total_time: result1[0].total_reading_time })
      }
      
    });


    
  });
  
   
 
});
app.post('/admin/course/content_transaction/progress', (req, res) => {
  const user_id = req.body.user_id; 
  const course_id = req.body.course_id; 
  const progress = req.body.progress;
  console.log(progress) 
 
  const query = `UPDATE course_transactions
  SET progress = ${progress}
  WHERE user_id = ${user_id}
    AND course_id = ${course_id};
  `;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ status: "failure" });
    } else {
      res.status(200).send({ status: "success" });
    }
  });
});
app.post('/certs/all', (req, res) => {
 
  const query = `SELECT * from  course_transactions 
  WHERE certificate_uploaded = 'yes'`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({ status: "failure" });
    } else {
      res.status(200).send({ status: "success" , result:result });
    }
  });
});
app.post('/admin/student/certadd', (req, res) => {
  const user_id = req.body.uid; 
  const course_id = req.body.course_id;
  const file = req.files.file;
  const name = file.name
  console.log(name);
  console.log(course_id);
  file.mv(`${__dirname}/admin_dashboard/public/uploads/certificates/${(name)}`)
  const query = `UPDATE course_transactions SET certificate_uploaded = 'Yes', certificate = '${name}' WHERE course_id = ${course_id} AND user_id = ${user_id}`;
  ;

con.query(query, (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send({ status: "failure" });
  } else {
    res.status(200).send({ status: "success", });
  }
});

});



app.get("/", (req, res) => {
  res.send("Hello !");
});
// listen
app.listen(5000, () => console.log("API is running on http://localhost:5000/"));
