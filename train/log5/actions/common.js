class User {
    // 此处的password可以是加密算法加密之后的密文，比如js的内置哈希函数
    constructor(user_name, password, times = 0) {
        this.user_name = user_name;
        this.password = password;
        this.log_time = times;
        this.birthday = 0;
    }

    getUserName() {
        return this.user_name;
    }

    setUserName(new_name) {
        this.user_name = new_name;
    }

    timeIncrement() {
        this.log_time += 1;
    }
}

var all_users = {
    "Dummy1":new User("Dummy1", "asdfghjkl", 0),
    "Enigmatisms":new User("Enigmatisms", "qwerty", 0),
    "Sentinel":new User("Sentinel", "1234567asd", 0),
    "Raven":new User("Raven", "1212422", 0)
};

export {all_users, User};