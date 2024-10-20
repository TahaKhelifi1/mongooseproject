const mongoose = require("mongoose");
require("dotenv").config();
const Person = require("./models/person");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

createAndSavePerson = () => {
  person = new Person({
    name: "Zina",
    age: 32,
    favoriteFoods: ["xxx", "yyy"],
  });
  person.save().then((err, data) => {
    if (err) {
      console.error("Error saving the person:", err);
    } else {
      console.log("Person saved successfully:", data);
    }
  });
};

addFood = (id, food) => {
  Person.findById(id)
    .then( person => {
      if (!person) {
        console.error("Person not found");
        return;
      } 
        person.favoriteFoods.push(food);
        return person.save();
    })
          .then(data => {
            if (data) {
              console.log("Person saved successfully:", data);
            }
          })
          .catch(err => {
            console.error("Error occurred:", err);
          });
};
//addFood("6710174a2dd0dea72b21ca7b", "lasagne");

updateAge = (personName, personAge) => {
  Person.findOneAndUpdate(
    {name: personName},
    {age: personAge},
    {new: true}
  )
  .then(updatedPerson => {
    if(!updatedPerson){
       console.log('Person now found');
    } else {
      console.log('Updated person: ',updatedPerson);
    }
  })
  .catch(err =>{
    console.error('Error updating person: ',err);
  });
};
//updateAge("Zina",25);

 removePersonById = (id) =>{
  Person.findByIdAndDelete(personId)
  .then(deletedPerson =>{
    if(!deletedPerson){
      console.log('Person not found');
    } else {
      console.log('person removed successfully: ',deletedPerson);
    }
  })
  .catch(err =>{
    console.error('Error removing person: ',err);
  });
};
//removePersonById("6710174a2dd0dea72b21ca7b");