const express = require('express');
const mongoose = require('mongoose');
const { exec } = require('child_process');
const cron = require('node-cron');
const app = express();

const connection = mongoose.connect('mongodb://127.0.0.1:27017/admin?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4').then(()=> console.log('db connected')).catch((error)=>{
    console.log('error in db connection :', error);
})

const backupDatabase = () => {
    const backupDir = './backup';
    const backupCommand = `mongodump --out ${backupDir}`;
  
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Backup process failed:', error);
        return;
      }
      if (stdout) {
        console.error('Backup process failed:', stdout);
        return;
      }
      if (stderr) {
        console.error('Backup process failed:', stderr);
        return;
      }
      console.log('Database backup completed successfully');
    });
  };

  const restoreDatabase = () => {
    const backupDir ='./backup';
    const restoreCommand = `mongorestore --drop --db your_database ${backupDir}`;
  
    exec(restoreCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Restore process failed:', error);
        return;
      }
      console.log(stderr);
      console.log('Database restore completed successfully');
    });
  };  

  app.post('/restore', (req, res) => {
    restoreDatabase();
    res.send('Database restore process initiated');
  });
  
  // Schedule backup to run every 5 minutes
  cron.schedule('*/4 * * * *', () => {
    backupDatabase();
  });  

const PORT = 8000;
app.listen(PORT, ()=> console.log('server started'));