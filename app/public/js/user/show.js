 new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data() {
        return {
            blogs: null,
            userId: null,
            userInfo: {}
        }
    },
    mounted() {
        this.userId = $userId;
        this.getBlog();
        this.getUserInfo();
    },
    methods: {
        getBlog() {
            var self = this;
            $.get(`/api/v1/user/` + this.userId + '/blogs', function (result) {
                self.blogs = result.data.data;
            })
        },
        getUserInfo() {
            var self = this;
            $.get(`/user/` + this.userId, function (result) {
                self.userInfo = result.data;
            })
        }
    },
    filters: {
        formatTime: function (time) {
            return moment(time).format('YYYY-MM-DD HH:mm:ss');
        },
        formatAvatar(avatar) {
            if (avatar) {
                return '/public/files/' + avatar;
            } else {
                return '/public/img/avatar.png'
            }
        }
    }
})