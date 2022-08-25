"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSuperstar = void 0;
class Inhabitant {
    constructor(id, friends) {
        this.id = id;
        this.friends = friends;
    }
}
class Oracle {
    constructor(file_content) {
        this.village = this.parse_content(file_content);
        this.price_to_pay = 0;
    }
    // #region ORACLE METHODS
    getVillageSize() {
        // return this.village.length - 1
        return this.village.length;
    }
    getVillage() {
        return this.village;
    }
    getPriceToPay() {
        return this.price_to_pay;
    }
    sortInhabitants() {
        // Puts the inhabitants that know less people in the first places.
        return this.village.sort((a, b) => {
            return (a.friends.length - b.friends.length);
        });
    }
    getPossibleSuperStars() {
        return this.village.filter((person) => {
            // We do "==" and not "===" in case person.friends[0] is "0" (even though this should not happen if the rest of the code it's correct.)
            return (person.friends[0] == 0);
        });
    }
    getNormalInhabitants() {
        return this.village.filter((person) => {
            // We do "==" and not "===" in case person.friends[0] is "0" (even though this should not happen if the rest of the code it's correct.)
            return (person.friends[0] != 0);
        });
    }
    knows(personA, personB) {
        this.price_to_pay += 1;
        let persA = this.village.filter((pers) => pers.id === personA)[0];
        let persB = this.village.filter((pers) => pers.id === personB)[0];
        // console.log(`QUESTION ${this.price_to_pay}: Does`, persA, 
        // " knows:", persB,
        // "? -->", persA.friends.includes(persB.id))
        if (personA > this.village.length) {
            return false;
        }
        return persA.friends.includes(persB.id);
    }
    parse_content(file_content) {
        const result = [];
        // Is this necessary?
        // const first_line = file_content[0].split(' ')
        // const size_of_the_village: number = +first_line[0]
        // Beeing able to do this?
        const size_of_the_village = +file_content[0];
        // Why do we leave an empty item at the beginning of the array here?
        // for (let i = 1; i <= size_of_the_village; ++i) {
        //   result[i] = new Inhabitant(
        //     i,
        //     file_content[i].split(' ').map((x: string) => +x)
        //   )
        // }
        // When we can change the code to create an array with empty slots?
        // Is it just a way to manages Inhabitants indexes in the arrays easier?
        for (let i = 0; i <= size_of_the_village - 1; ++i) {
            result[i] = new Inhabitant(i + 1, file_content[i + 1].split(' ').map((x) => +x));
        }
        return result;
    }
}
// #region testing functions
function get_oracle_test_with_superstar() {
    console.log("Test: One Superstar");
    // This method returns an oracle representing a village of 3 people in which:
    // - 1 does not know anybody
    // - 2 knows 1 and 3
    // - 3 knows 1
    // Hence, 1 is a superstar.
    return new Oracle(['3', '0', '1 3', '1']);
}
function get_oracle_test_without_any_superstar() {
    console.log("Test: Without Superstars");
    // """
    // This method returns an oracle representing a village of 3 people in which:
    // - 1 knows 3
    // - 2 knows 1 and 3
    // - 3 knows 1
    // Hence, there isn't any superstar.
    // """
    return new Oracle(['3', '3', '1 3', '1']);
}
function get_oracle_test_with_many_possible_superstars() {
    console.log("Test: Many possible Superstars");
    return new Oracle(['6', '0', '1 2 3 4 5 6', '1 3 6', '3 5 6', '1 2 4 6', '0']);
}
function get_oracle_test_with_all_as_superstars() {
    console.log("Test: All are Superstars");
    // What should be the expected answer in this case?
    // No one knows anyone.
    // If we assume that, since the rest of the village don't know X inhabitant, then X is not a superstar,
    // then it would be impossible to have 2 superstars in the same village since they wouldn't knew eachother.
    // To allow that a village can have multiple superstars, we accept in this case that all of them are superstars.
    return new Oracle(['6', '0', '0', '0', '0', '0', '0']);
}
function get_oracle_test_1() {
    console.log("Test: 1");
    return new Oracle(['3', '1', '1 3', '1']);
}
function get_oracle_test_2() {
    console.log("Test: 2");
    return new Oracle(['3', '1 3', '1 3', '0']);
}
function get_oracle_test_3() {
    console.log("Test: 3");
    return new Oracle(['3', '1 3', '0', '1 3']);
}
// In test 4 (price 1) and test 5 (price 2) it could seem that we could save questions depending on how we sort the villange.
// But to properly sort, we should check the friends and the inhabitant candidate to superstart and I feel that to do that
// we already have the oracle.knows() method, and doing that check manually to sort would be cheating.
function get_oracle_test_4() {
    console.log("Test: 4");
    return new Oracle(['3', '1 3', '0', '2 3']);
}
function get_oracle_test_5() {
    console.log("Test: 5");
    return new Oracle(['3', '2 3', '0', '1 3']);
}
function get_oracle_test_6() {
    console.log("Test: 6");
    return new Oracle(['3', '2 3', '0', '2 3']);
}
function get_oracle_test_7() {
    console.log("Test: 7");
    return new Oracle(['3', '0', '0', '2 3']);
}
function get_oracle_test_8() {
    console.log("Test: 8");
    return new Oracle(['1', '0']);
}
function get_oracle_test_9() {
    console.log("Test: 9");
    return new Oracle(['1', '1']);
}
function get_oracle_test_10() {
    console.log("Test: 10");
    return new Oracle(['1', '3']);
}
// #endregion
/****
 * You enter a village in which you don't speak the language. You have the list of inhabitants.
 * We define a superstar as someone known by everyone and who does not know anyone. You want
 * an autograph from every superstar you can find in the village.
 * At the center, you can visit the oracle which answers one and only one question: does X know Y ?
 * The question is very expensive, so you want to minimise the number of questions asked to the oracle.
 * What's your strategy to identify superstars if any ?
 *
 * You are passed an oracle as input. It provides the following functions:
 * - `oracle.getVillageSize()`, which returns the number of inhabitants in the village,
 * - `oracle.knows(person1: number, person2: number): boolean`,
 *      which return `true` if `person1` knows `person2`, `
 *      false` otherwise
 * - `oracle.getPriceToPay()`, the price you have to pay so far
 * WARNING: the oracle starts its count at 1, hence oracle.knows(0,1) does not make any sense.
 */
function findSuperstar(oracle) {
    // Logical Approach:
    // We separate people that know 0 inhabitants (possibleSuperStars), from the people who know some 
    // inhabitants (normalInhabitants).
    // We sort the village so that people that know less inhabitants are asked before. This way, they may
    // discard more "possibleSuperStars" with only one question.
    // We keep track of inhabitants that were "possibleSuperStars" but got discarted, so we don't ask about 
    // them any more storing them in "possibleSuperStarsToIgnore".
    // We keep track of group of friends that has been asked about so we don't ask twice if two inhabitants 
    // knows the same group of friends.
    // At the end we separate the real superstars from those who could have been but some of the village 
    // didn't knew them.
    let possibleSuperStarsToIgnore = [];
    let alreadyCheckedFriendGroup = [];
    oracle.sortInhabitants();
    console.log("Village: ", oracle.getVillage());
    var possibleSuperStars = oracle.getPossibleSuperStars();
    if (possibleSuperStars.length === 0) {
        return [];
    }
    const normalInhabitants = oracle.getNormalInhabitants();
    // console.log("~ normalInhabitants", normalInhabitants)
    normalInhabitants.forEach((normalInhabitant) => {
        possibleSuperStars.forEach((possibleSuperStar) => {
            if (!possibleSuperStarsToIgnore.includes(possibleSuperStar) && !alreadyCheckedFriendGroup.includes(possibleSuperStar.friends)) {
                if (!oracle.knows(normalInhabitant.id, possibleSuperStar.id)) {
                    possibleSuperStarsToIgnore.push(possibleSuperStar);
                }
            }
        });
        alreadyCheckedFriendGroup.push(normalInhabitant.friends);
    });
    // console.log("Close To Be SuperStars:",possibleSuperStarsToIgnore)
    if (possibleSuperStars === possibleSuperStarsToIgnore) {
        return [];
    }
    const result = possibleSuperStars.filter((ps) => {
        return !possibleSuperStarsToIgnore.includes(ps);
    }).map(x => x.id);
    return result;
}
exports.findSuperstar = findSuperstar;
function main() {
    const run = (oracle) => {
        const superstars = findSuperstar(oracle);
        console.log("Superstars:", superstars, "| Price:", oracle.getPriceToPay());
        console.log('--------------------------------------------------');
    };
    run(get_oracle_test_with_superstar());
    run(get_oracle_test_without_any_superstar());
    run(get_oracle_test_with_many_possible_superstars());
    run(get_oracle_test_with_all_as_superstars());
    run(get_oracle_test_1());
    run(get_oracle_test_2());
    run(get_oracle_test_3());
    run(get_oracle_test_4());
    run(get_oracle_test_5());
    run(get_oracle_test_6());
    run(get_oracle_test_7());
    run(get_oracle_test_8());
    run(get_oracle_test_9());
    run(get_oracle_test_10());
}
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
