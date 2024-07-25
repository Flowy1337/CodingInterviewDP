



function foo(n) {

    for (var i = 0; i < n; i++) {
        if (i%5===0 && i%3===0) {
            console.log("FizzBuzz");
            continue;
        }
        if (i%3===0) {
            console.log("Fizz");
            continue;
        }
        if (i % 5===0) {
            console.log("Buzz");
            continue;
        }

        console.log(i)

    }

}
foo(20);