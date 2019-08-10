


export default (model) => {

  const { inputs, chromosomes, mutationRate, space } = model
  
  // var chromosomes = model.chromosomes;
  // var space = 20;
  // var mutationRate = 0.5;
  return beginAlgorithm()
  
  function beginAlgorithm() {
    //this is to track how long the algorithm will take
    // var t0 = performance.now();
    //we'll remove the contents of the output report, and display the table since it starts out as hidden
    // $("#outputReport tbody").empty()
    // $("#outputReport").show()
  

    //kick things off by creating a bunch of arrays, where arrays are randomly assigned 0/1 for whether or not we keep or dismiss an object
    //for each array, we sum the values,  sum the size, then check that the constraints are satisfied
    //if all constraints are satisfied, then we push the array to allPotentialSolutions
    var allPotentialSolutions = [];
    var potentialSolutionsToStart = 3;
    var maxGenerations = 10000;

    for (var i = 0; i < potentialSolutionsToStart; i++) {
      var totalValue = 0;
      var totalSize = 0;
      var potentialSolution = [];
  
      //create a possible solution, where we assign binary (bin) values for each object
      for (let e = 0; e < inputs.length; e++) {
        var bin = Math.round(Math.random());
        potentialSolution.push(bin);
        totalValue = totalValue + (bin * inputs[e].value);
        totalSize = totalSize + (bin * inputs[e].size);
      }
      //if the we exceed our space constraint, we set the total value to 0	
      if (space < totalSize) {
        totalValue = 0;
      }
  
      //tack on the calculated totalValue and totalSize to the potentialSolution array
      potentialSolution.push(totalValue);
      potentialSolution.push(totalSize);
  
      //push the potential solution as a candidate
      allPotentialSolutions.push(potentialSolution);
    }
  
    //sort all potential solutions so we can then take the x number of elite solutions to keep
    allPotentialSolutions = allPotentialSolutions.sort(Comparator);
    allPotentialSolutions = allPotentialSolutions.splice(0, chromosomes);
  
  
    //Alright, way to go! Now we have our initial set of data to perform learning algorithms on!
    //Let's begin the machine learning loop which will run until the total generations equals the the maximum allowable generations 
    var globalOptimum = 0;
    var totalGenerations = 0;
    for (var x = 0; totalGenerations < maxGenerations; x++) {
      allPotentialSolutions = learningAlgorithm(allPotentialSolutions) // this does the crossover and mutation then sorts the potential solutions by value
      var localOptimum = allPotentialSolutions[0] // the best solutution from the generation is returned as a local optimum
      if (localOptimum[inputs.length] > globalOptimum) { // if the value is greater than the global optimum, we'll replace the global with the local
        globalOptimum = localOptimum[inputs.length];
        totalGenerations++; //keep that ticker going up!
        if (maxGenerations - totalGenerations < 2000) { //if the #rows to post to the DOM is large, it slows things down so I capped it at 2000

          // $("#outputReport tbody").prepend("<tr><td>" + totalGenerations + "</td><td>" + localOptimum.slice(0, -2) + "</td><td>" + localOptimum[(inputs.length + 1)] + "</td><td>" + localOptimum[inputs.length] + "</td></tr>")
        }
      } else {
        totalGenerations++; //still gotta keep that ticker going up! 
        if (maxGenerations - totalGenerations < 2000) {	//if the #rows to post to the DOM is large, it slows things down so I capped it at 2000
          // $("#outputReport tbody").prepend("<tr><td>" + totalGenerations + "</td><td>" + localOptimum.slice(0, -2) + "</td><td>" + localOptimum[(inputs.length + 1)] + "</td><td>" + localOptimum[inputs.length] + "</td></tr>")
        }
      }
    }
    return localOptimum

  
    //this is to track how long the algorithm took
    // var t1 = performance.now();
    // $("#countdown").html("The algorithm took " + Math.round(((t1 - t0) / 1000) * 1000) / 1000 + " seconds.")
  }
  
  function learningAlgorithm(allPotentialSolutions) {
    //this is where it gets confusing, but bear with me
    //we will take the elite solutions, duplicate the very best option to keep it untouched, and conduct crossover amongst the elite solutions
    var localOptimum = allPotentialSolutions[0].slice(0); //gets the best solution
    var crossoverSplitPlacement = Math.floor((Math.random() * 10)); // picks a random number that we split at for crossover
    var cloneArr = [...allPotentialSolutions] //performing a deep clone https://en.wikipedia.org/wiki/Object_copying0


    var crossoverArr = [];
  
    //creating the top half for each crossover
    for (let i = 0; i < allPotentialSolutions.length; i++) {
      crossoverArr.push(new Array)
      var topPortion = cloneArr[i].splice(0, crossoverSplitPlacement)
      for (let e = 0; e < (chromosomes - 1); e++) {
        crossoverArr[i].push(topPortion.slice(0))
      }
    }
  
    //now we are creating the bottom half for each crossover
    //we need to mix and match the tops and bottoms, but we don't want to match the same combinations we started with
    //so we will remove the complete arrays as they are complete and pushing them to the crossoverArr
    var len = crossoverArr.length
    for (let i = 0; i < len; i++) {
      var bottomPortion = cloneArr[i].slice(0, -2)
  
      // we will push [i] bottom half to the tops
      var crossoverIndex = i;
      for (var e = 0; e < len - 1; e++) {
        if (crossoverIndex < (len - 1)) {
          crossoverIndex++;
        }
        else {
          crossoverIndex = 1 - len + crossoverIndex
        }
        //push each value from the bottom array into the array for the top			
        bottomPortion.forEach(function (entry) {
          crossoverArr[crossoverIndex][0].push(entry);
        });
  
        //we remove complete arrays (after a top/bottom mate) from their parent array
        //and to the end as a new array outside of the original parent
        var tempPotentialSolution = crossoverArr[crossoverIndex].splice(0, 1)
        tempPotentialSolution = calculateScore(tempPotentialSolution)
        tempPotentialSolution.forEach(function (entry) {
          crossoverArr.push(entry);
        });
      }
    }
  
    //remove the original parent arrays
    crossoverArr.splice(0, len);
  
    //puts the localOptimum back in the mix
    crossoverArr.push(localOptimum)
  
    //mutates the localOptimum
    crossoverArr.push(mutation(localOptimum))
  
    //sorts the arr based on value and take the elite and report the localOptimum
    crossoverArr.sort(Comparator);
    crossoverArr = crossoverArr.splice(0, chromosomes);
    return (crossoverArr)
  
  }
  
  //this is a reusable function for calculating the fitness score/total value of the inputs
  //keeping in mind that the constraint of sqftmax cannot be exceeded!
  function calculateScore(arr) {
    var totalValue = 0;
    var totalSize = 0;
    for (var a = 0; a < arr[0].length; a++) {
      var bin = arr[0][a];
      totalValue = totalValue + (bin * inputs[a].value);
      totalSize = totalSize + (bin * inputs[a].size);
    }
  
    if (space < totalSize) {
      totalValue = 0;
    }
  
    arr[0].push(totalValue);
    arr[0].push(totalSize);
  
    //push the potential solution as a candidate
    return (arr);
  }
  
  //a little mutation here adds some randomness to the algorithm so we don't get stuck in a rut
  //the higher the mutation rate, the more randomness we are introducing
  function mutation(localOptimum) {
    var totalValue = 0;
    var totalSize = 0;
    var arr = [];
  
    //we use the local optimum and switch the binary value of an input if the random number is >= mutation rate
    for (let e = 0; e < inputs.length; e++) {
      var bin = Math.round(Math.random()) >= mutationRate ? 1 - localOptimum[e] : localOptimum[e]
      arr.push(bin);
      totalValue = totalValue + (bin * inputs[e].value);
      totalSize = totalSize + (bin * inputs[e].size);
    }
    //make sure the constraints are met
    if (space < totalSize) {
      totalValue = 0;
    }
    //then push to the array the value and size
    arr.push(totalValue);
    arr.push(totalSize);
  
    //return the potential solution as a candidate
    return (arr);
  }
  
  //use this to sort an array of arrays in decending order
  function Comparator(a, b) {
    if (a[inputs.length] > b[inputs.length]) return -1;
    if (a[inputs.length] < b[inputs.length]) return 1;
    return 0;
  }


};


