exports.NutritionRequirementCalculator = (age,gender,height,weight,activeLevel)=>{
        var calcium = 0;
        if(age>=71)
            calcium = 1200;
        else if(age >=51 && gender ==='female')
            calcium = 1200;
        else if(age >=51 && gender ==='male')
            calcium = 1000;
        else if(age >= 19)
            calcium = 1000;
        else if(age >= 9)
            calcium = 1300;
        else if(age >= 4)
            calcium = 1000;
        else if(age >= 1)
            calcium = 700;
        else 
            calcium = 260


        var fiber = 0;
        if(gender === 'male')
            if(age>=51)
                fiber=30;
            else
                fiber=38;
        if(gender === 'female')
            if(age>=51)
                fiber= 21;
            else    
                fiber= 25;

        var fat = 0;
        if(age >20)
            fat = 20;
        else if (age > 4)
            fat = 30;
        else 
            fat = 40;

        var protein =0;
        protein = Math.round(weight * 0.8,2);

        var bmr = 0;
        if(gender ==='male')
            bmr = 10 * weight + 6.25 * height - 5 * age +5;
        if(gender ==='female')
            bmr = 10 * weight  + 6.25 * height - 5* age -161;

        var calorie = Math.round(bmr * activeLevel,2);

        return {calcium,fiber,fat,protein,calorie};
}