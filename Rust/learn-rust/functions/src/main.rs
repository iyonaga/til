fn main() {
    another_function(5, 10);

    let y = {
        let x = 3;
        x + 1
    };

    println!("{}", y);
}


fn another_function(x: i32, y: i32) {
    println!("The value of x is {}", x);
    println!("The value of y is {}", y);
}

fn five() -> i32 {
    5
}