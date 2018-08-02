'use strict';

var app = new Vue({
  el: '#profile',
  data() {
    return {
      user: {
      },
      labels: []
    };
  },
  mounted() {
    var self = this;
    $.get('/user', ret => {
      if (ret.code === 0)
        self.user = ret.data;
    })
  },
  methods: {
    setUserInfo() {
      $.ajax({
        type: 'put',
        url: '/user',
        data: JSON.stringify(this.user),
        contentType: 'application/json',
        success: function () {
          window.location.reload(); 
        },
        error: function (err, status) {
          console.log(err, status)
        }
      })
    },
    fileupload({ id, url, done}) {
      return $(function () {
        $(id).fileupload({
          url,
          dataType: 'json',
          autoUpload: true,
          dropZone: null,
          pasteZone: null,
          maxNumberOfFiles: 1,//最大上传文件数目
          maxFileSize: 5000000, //文件最大为5MB
          start(start) {
            // console.log(start);
          },
          done,
          fail(err) {
            console.log(err);
          },
          always: () => {
          },
          progress: (data) => {
            // var progress = parseInt(data.loaded / data.total * 100, 10);
            // if (progress === 100) {
            //   toastr.success('头像上传成功！', '通知');
            // }
            //   $('#progress-bar').css('width', progress + '%').text(progress + '%');
          },
        });
      });
    },
    upload() {
      var self = this;
      var done = function(e, data) {
        self.user.avatar = data.result ? data.result.md5 : '';
      }
      this.fileupload({ id: '#id_upload', url: "/api/v1/files", done })
      $('#id_upload').click();
    },
    uploadTag(index) {
      var self = this;
      var done = function(e, data) {
        self.user.labels[index].avatar = data.result ? data.result.md5 : '';
      }
      this.fileupload({ id: '#id_upload', url: "/api/v1/files", done })
      $('#id_upload').click();
    },
    addLabels() {
      this.user.labels.push({ url: '', avatar: ''})
    },
    removeLabel(index) {
      
      this.user.labels.splice(index, 1);
    }
  },
  filters: {
    formatAvatar(avatar) {
      if (avatar)
        return '/public/files/' + avatar;
      return '/public/img/profile_big.jpg';
    }
  }
});
