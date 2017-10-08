doc.useServiceAccountAuth(creds, function (err) {
   if (err) {
     console.log('An error occured (doc.useServiceAccountAuth):');
     console.log(err);
   }

   doc.getInfo(function(err, info) {
     if (err) {
       console.log('An error occured (doc.getInfo):');
       console.log(err);
     }

     sheet = info.worksheets[0];

     sheet.getRows({
       offset: 1,
       limit: 1500,
     }, function (err, rows) {
       if (err) {
         console.log('An error occured (sheet.getRows):');
         console.log(err);
       }

       rows.forEach(function(row,index,adsArr) {
         row.adurl = 'Yes';
         row.date='';
         row.time='';
         row.status='1';
         row.save()
       });//end of rows.forEach

     });//end of sheet.getRows


   });//end of doc.getInfo

 });//end of useServiceAccountAuth
