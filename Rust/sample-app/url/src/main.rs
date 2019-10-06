use url::percent_encoding::percent_decode;
use failure::Error;
use structopt::StructOpt;
use std::io::{self, Read};
use atty::Stream;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(StructOpt, Debug)]
struct Opt {
    #[structopt(name = "INPUT")]
    input: Option<String>,
}

fn read_from_stdin() -> Result<String> {
    let mut buf = String::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();
    handle.read_to_string(&mut buf)?;

    Ok(buf)
}

fn main() -> Result<()> {
    let opt = Opt::from_args();
    let input = match opt.input {
        Some(i) => i,
        None => read_from_stdin()?
    };

    if input.is_empty() {
        Opt::clap().get_matches().usage();
    }

    Ok(println!("{}", decode(&input)?))
}

fn decode(input: &str) -> Result<String> {
    let decoded = percent_decode(input.as_bytes()).decode_utf8()?;
    Ok(decoded.to_string())
}

#[cfg(test)]
mod tests {
    use crate::decode;

    #[test]
    fn decode_space_ok() {
        let expected = "foo bar";
        let input = "foo%20bar";
        let actual = decode(input).unwrap();
        assert_eq!(expected, actual);
    }
}