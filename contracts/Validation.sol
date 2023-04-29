// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Importer smart contract general.col

//
//  !!!  HERE MSG.SENDER IS THE VALIDATOR, WE MUST CHANGE THIS IF WE CHANGE OF PARADIGME  noted with *
//
//
contract validation{
    address public owner;
    string public name = 'Validation';

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted(){ //True only if msg.sender is the owner
         if(owner == msg.sender) _;  // "_" means : "continue with the function"
    }

    struct document {
        //uint256 hash;
        // prender le temps de création ?
        bytes32 hash; // ?
        string date; // Any date we think is useful
        uint timestamp; // we can find the days, hours, ...
        string subject;
        address[] Validate; //Addresses of those who had validated | Validate.length is equal to the number of validation 
    }

    mapping(bytes32=>address[]) public DocToReviewers;
    mapping(bytes32=>address[]) public DocToValidate; // list of the addresses having validated the document
    mapping(bytes32=>document) public HashToDoc;

// At the beggining of the global contract : validate = false

    //Return true if msg.sender is a validator, if not return false **
    function isReviewer(bytes32 hash_) public view returns(bool){ //True only if msg.sender is the owner
        for(uint k=0; k<DocToReviewers[hash_].length; ++k){
            if(DocToReviewers[hash_][k] == msg.sender){
                return true;
            }
        }
        return false;
    }

    function NotInValidate(bytes32 hash_) public view returns(bool){
        for(uint k=0; k<DocToValidate[hash_].length; ++k){
            if(DocToValidate[hash_][k] == msg.sender){
                return false;
            }
        }
        return true;
    }

    //Set a list of reviewers - OR AT LEAST make sure the list is made by reviewers
    //Who calls ? -> Smart contract, owner
    function BuildDocument(string memory inputHash, string memory the_date, string memory a_subject, address[] memory Reviewers) public  {
        //convert string hash to bytes32
        bytes32 hash = bytes32(bytes(inputHash));
        //Set the document as non-verified
        address[] memory Validate;

        //Add the reviewers
        for(uint k=0; k<Reviewers.length;++k){
            DocToReviewers[hash].push(Reviewers[k]);
        }

        document memory the_document;
        the_document = document(hash, the_date, block.timestamp, a_subject, Validate);
        HashToDoc[hash] = the_document; //The document is added and associated with its hash
    }

    //Validate : add the address of the validator (peer reviewer)
    //Who calls ? -> A reviewer
    function Validation(string memory inputHash) public  {
        bytes32 hash_ = bytes32(bytes(inputHash));   
        require(isReviewer(hash_), "You must be a peer-reviewer.\n");
        require(NotInValidate(hash_), "You have already validated the document");
        DocToValidate[hash_].push(msg.sender);
        //call the final verification :?
        if(isValidated(inputHash)){
            //
        }
    }

    //Return true if the document is fully validated :
    function isValidated(string memory inputHash) public view returns(bool){
        bytes32 hash_ = bytes32(bytes(inputHash));   
        if(DocToValidate[hash_].length == DocToReviewers[hash_].length){
            return true;
        }
        return false;
    }


    //Getters------------------------------

    function getDocToReviewers(string memory inputHash) public view returns(address[] memory){
        bytes32 hash_ = bytes32(bytes(inputHash));   
        return DocToReviewers[hash_];
    }

    function getDocToValidate(string memory inputHash) public view returns(address[] memory){
        bytes32 hash_ = bytes32(bytes(inputHash));
        return DocToValidate[hash_];
    }

    function getHashToDoc(string memory inputHash) public view returns(document memory){
        bytes32 hash_ = bytes32(bytes(inputHash));
        return HashToDoc[hash_];
    }
}


