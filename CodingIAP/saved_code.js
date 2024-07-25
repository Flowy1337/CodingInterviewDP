function LCSubStr( X,  Y , m , n) {
   

    var LCStuff =
        Array(m + 1).fill().map(()=>Array(n + 1).fill(0));
    var result = 0;

    // To store length of the longest
    // common substring
    var result = 0;

    return result;}

var X = "TempleOS";
var Y = "MacOS";

var m = X.length;
var n = Y.length;
LCSubStr(X, Y, m, n);
// END



function fibSOL(n){
    var fib1=0;
    var fib2=1;
    for(let i=0; i<n; i++){
        const temp = fib2;
        fib2 = fib1+fib2;
        fib1= temp;

    }
    return fib2;
}




function LCSubStr( X,  Y , m , n) {


    var LCStuff =
        Array(m + 1).fill().map(()=>Array(n + 1).fill(0));

    // To store length of the longest
    // common substring
    var result = 0;

    // Following steps build
    // LCSuff[m+1][n+1] in bottom up fashion
    for (i = 0; i <= m; i++) {
        for (j = 0; j <= n; j++) {
            if (i === 0 || j === 0)
                LCStuff[i][j] = 0;
            else if (X[i - 1] === Y[j - 1]) {
                LCStuff[i][j] = LCStuff[i - 1][j - 1] + 1;
                result = Math.max(result, LCStuff[i][j]);
            } else
                LCStuff[i][j] = 0;
        }
    }
    return result;
}

var X = "TempleOS";
var Y = "MacOS";

var m = X.length;
var n = Y.length;
LCSubStr(X, Y, m, n);



const values = [10, 20, 30, 40];
const weights = [30, 10, 40, 20];
const capacity = 40;

function getKnapSack(capacity, values, weights) {
    // Create array
    const arr = new Array(values.length + 1);

    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(capacity + 1).fill(0);
    }

    for (let i = 1; i <= values.length; i++) {
        // choose all weights from 0 to maximum capacity

        for (let j = 0; j <= capacity; j++) {
            // Don't pick ith element if j-weights[i-1] is negative
            if (weights[i - 1] > j) {
                arr[i][j] = arr[i - 1][j];
            } else {
                // Store the max value that we get by picking or leaving the i-th item
                arr[i][j] = Math.max(arr[i - 1][j], arr[i - 1][j - weights[i - 1]] + values[i - 1]);
            }
        }
    }

    // Return maximum value
    return arr[values.length][capacity];
}

getKnapSack(capacity, values, weights);