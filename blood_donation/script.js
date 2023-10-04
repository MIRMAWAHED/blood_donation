const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql2")

app.use(bodyParser.json());

// Handle POST requests to the /login route

app.use("/assets", express.static("assets"))
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html")
  pool.query(
    'UPDATE `current_users` SET `user` = ?, `current_id`=0 WHERE id = ?',
    ['default', 1], // Replace with your desired values
    (updateError, updateResults) => {
      if (updateError) {
        console.error(updateError);
        // Handle the update error as needed
      } else {
        // Handle the update success
        console.log('User record updated successfully');
      }
    }
  );
})
app.get("/m", function (req, res) {
  res.sendFile(__dirname + "/home.html")
 
})








const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "database1",
  connectionLimit: 35
})
app.post('/login', (req, res) => {
  // Retrieve the user's login information from the request body
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  console.log('Request data:', {
    email: email,
    password: password,
    role: role,
  });

  pool.query(
    'SELECT * FROM ?? WHERE email = ? AND pwd = ?',
    [role, email, password],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {

        // No matching user found in the database
        res.status(401).json({ success: false, message: 'Authentication failed' });
      } else {
        // User found in the database, authentication successful
        const id = results[0].id;
        pool.query(
          'UPDATE `current_users` SET `user` = ?,`current_id`=? WHERE id = ?',
          [role, id, 1], // Replace with your desired values
          (updateError, updateResults) => {
            if (updateError) {
              console.error(updateError);
              // Handle the update error as needed
            } else {
              // Handle the update success
              console.log('User record updated successfully');
            }
          }
        );
        res.json({ success: true, message: 'Authentication successful' });
        console.log('Authentication successful');

      }
    }
  );
});
app.post('/check_notify', (req, res) => {
  // Retrieve the user's login information from the request body
  const id = req.body.id;

  console.log('Request data:', {
    id: id
  });

  pool.query(
    'SELECT * FROM ?? WHERE `request_id`=?',
    ['notify', id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {

        // No matching user found in the database
        res.json({ success: true, message: '' });

      } else {
        // User found in the database, authentication successful
        const id = results[0].id;

        res.json({ success: false, message: '' });


      }
    }
  );
});

app.post('/signin', (req, res) => {
  // Retrieve the user's signup information from the request body
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  // Use a SQL query to insert the new user into the database
  pool.query(
    'INSERT INTO ?? (name,email, pwd) VALUES (?, ?, ?)',
    [role, name, email, password],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }
      else {
        const id = results.insertId;
        pool.query(
          'UPDATE `current_users` SET `user` = ?,`current_id`=? WHERE id = ?',
          [role, id, 1], // Replace with your desired values
          (updateError, updateResults) => {
            if (updateError) {
              console.error(updateError);
              // Handle the update error as needed
            } else {
              // Handle the update success
              console.log('User record updated successfully');
              res.json({ success: true, message: 'User signed up successfully', id: id });
            }
          }
        );

      }


    }
  );
});
app.post('/fill_req', (req, res) => {
  // Retrieve the user's signup information from the request body
  const id= req.body.id
  const name= req.body.name
  const ph= req.body.ph
  const units=req.body.units
  const urg=req.body.urg
  const b_grp= req.body.b_grp
  const adrs= req.body.adrs
  
  // Use a SQL query to insert the new user into the database
  pool.query(
    'INSERT INTO ?? (name,blood_type, units,hospital_address,phone_num,urgency,userid) VALUES (?, ?, ?,?,?,?,?)',
    ['request', name, b_grp,units,adrs,ph,urg,id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }
      else {
        const id = results.insertId;
        res.json({ success: true, message: 'User signed up successfully' });


      }


    }
  );
});
app.post('/doner_ex', (req, res) => {
  // Retrieve the user's signup information from the request body
  const id = req.body.id;
  const email = req.body.email;
  const name = req.body.name;
  const ph = req.body.ph;
  const age = req.body.age;
  const gender = req.body.gender;
  const b_grp = req.body.b_grp;
  const m_con = req.body.m_con;
  const adrs = req.body.adrs;
  // Use a SQL query to insert the new user into the database
  pool.query(
    'INSERT INTO donor_extra_info (id,name, phone_number, age, gender, blood_group, medical_conditions, address) VALUES (?,?, ?, ?, ?, ?,?,?);',
    [id, name, ph, age, gender, b_grp, m_con, adrs],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }
      else {
        res.json({ success: true, message: 'doner_ex' });


      }


    }
  );
});
app.post('/notify', (req, res) => {
  // Retrieve the user's signup information from the request body
  const id = req.body.id
  const sqlQuery = 'SELECT * FROM current_users';
  console.log("cccc id" + id)
  // Execute the SQL query
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the query result as a JSON response
      console.log("b cid" + result[0].current_id)
      const current_id = result[0].current_id
      pool.query(
        'select * from request where id =?',
        [id],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
          }
          else {
            console.log("a uid" + results[0].id)
            pool.query(
              'INSERT INTO ?? (user_id,doner_id,request_id) VALUES (?, ?, ?)',
              ['notify', results[0].userid, current_id, id],
              (error, results) => {
                if (error) {
                  console.error(error);
                  res.status(500).json({ success: false, message: 'Internal server error' });
                  return;
                }


                res.json({ success: true, message: 'notify updated' });
              }
            );
          }



        }
      );




    }
  });




});
app.get('/request', (req, res) => {
  // Define your SQL query here
  const sqlQuery = 'SELECT * FROM request';

  // Execute the SQL query
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the query result as a JSON response
      res.json(result);
    }
  });
});
app.get('/get_notify', (req, res) => {
  // Define your SQL query here
  const sqlQuery = 'SELECT * FROM notify';

  // Execute the SQL query
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the query result as a JSON response
      res.json(result);
    }
  });
});
app.get('/doner_info', (req, res) => {
  // Define your SQL query here
  const sqlQuery = 'SELECT * FROM doner';

  // Execute the SQL query
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the query result as a JSON response
      res.json(result);
    }
  });
});
app.get('/doner_verify', (req, res) => {
  // Define your SQL query here
  // var id
  const sqlQuery1 = 'SELECT * FROM current_users';

  // Execute the SQL query
  pool.query(sqlQuery1, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      // res.status(500).send('Internal Server Error');
    } else {
      // Send the query result as a JSON response
      const id = result[0].current_id
      const sqlQuery = `SELECT * FROM doner where id =${id}`;

      // Execute the SQL query
      pool.query(sqlQuery, (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
        } else {
          // Send the query result as a JSON response
          res.json(result);
        }
      });
    }
  });

});
app.get('/current', (req, res) => {
  // Define your SQL query here
  const sqlQuery = 'SELECT * FROM current_users';

  // Execute the SQL query
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the query result as a JSON response
      res.json(result);
    }
  });
});
app.get('/user_req', (req, res) => {
  // Define your SQL query here
  const sqlQuery = 'SELECT * FROM request';

  // Execute the SQL query
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the query result as a JSON response
      res.json(result);
    }
  });
});
app.post('/verify', (req, res) => {
  // Retrieve the user's login information from the request body
  const id = req.body.id;
  const status = req.body.status;
  console.log('Request data:', {
    id: id,
    status: status
  });

  pool.query(
    'UPDATE doner SET verified = ? WHERE id = ?;',
    [status, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        // No matching user found in the database
        res.status(401).json({ success: false, message: 'Authentication failed' });
      } else {
        // User found in the database, authentication successful

        res.json({ success: true, message: 'Authentication successful' });
        console.log('status changed successful');

      }
    }
  );

});
app.post('/delete', (req, res) => {
  // Retrieve the user's login information from the request body
  const id = req.body.id;
  const role = req.body.table;

  console.log('Request data:', {
    id: id,
    role: role
  });
  pool.query(
    'DELETE FROM ?? WHERE id = ?;',
    ['donor_extra_info', id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        // No matching user found in the database
        res.status(401).json({ success: false, message: 'Authentication failed' });
      } else {
        // User found in the database, authentication successful

        // res.json({ success: true, message: 'Authentication successful' });
        console.log('doner_ex deleted');

      }
    }
  );
  pool.query(
    'DELETE FROM ?? WHERE id = ?;',
    [role, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        // No matching user found in the database
        res.status(401).json({ success: false, message: 'Authentication failed' });
      } else {
        // User found in the database, authentication successful

        res.json({ success: true, message: 'Authentication successful' });
        console.log('doner deleted');

      }
    }
  );

});
app.post('/delete_notfy', (req, res) => {
  // Retrieve the user's login information from the request body
  const id = req.body.id;
  

  console.log('Request data:', {
    id: id,
   
  });

  pool.query(
    'DELETE FROM ?? WHERE request_id = ?;',
    ['notify', id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        // No matching user found in the database
        res.status(401).json({ success: false, message: 'Authentication failed' });
      } else {
        // User found in the database, authentication successful

        res.json({ success: true, message: 'Authentication successful' });
        console.log('notification deleted');

      }
    }
  );

});


app.get('/notify_info', (req, res) => {
  // Define your SQL query here
  const sqlQuery0 = 'SELECT * FROM request';

  // Execute the SQL query
  pool.query(sqlQuery0, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error1');
    } else {
      res.json(result);
    }
  });
});
app.get('/doner_ex', (req, res) => {
  // Define your SQL query here
  const sqlQuery0 = 'SELECT * FROM donor_extra_info';

  // Execute the SQL query
  pool.query(sqlQuery0, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error1');
    } else {
      res.json(result);
    }
  });
});
app.post('/get_record', (req, res) => {
  const id = req.body.id;
  const table = req.body.table;

  pool.query(
    'SELECT * FROM ?? WHERE id = ?',
    [table, id],
    (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ success: false, message: 'Record not found' });
        } else {
          const record = results[0];
          res.json({ success: true, record });
        }
      }
    }
  );
});
app.listen(4500)