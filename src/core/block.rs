pub struct Block {
    nonce:         u64,
    block_height:   u64,
    timestamp:     u64,
    transactions:  Vec<Transaction>,
    previous_hash: String,
    block_hash:     String
}

impl Block {
    pub fn new(nonce: u64, block_height:u64, timestamp: u64, transactions: Vec<Transaction>, previous_hash: String, block_hash: String) -> Block {
        Block {
            nonce,
            block_height,
            timestamp,
            transactions: data.split(',').map(|s| s.parse().unwrap()).collect(),
            previous_hash,
            block_hash
        }
    }
}

fn set_hash(&mut self, hash: String) {
    self.block_hash = hash;
    while self.block_hash.chars().take(4).collect::<String>() != "0000" {
        self.nonce += 1;
        self.block_hash = self.calculate_hash();
    }
}

fn calculate_hash(&self) -> String {
    // Implement the hash calculation logic here
    // ...
    String::from("calculated_hash")
}
