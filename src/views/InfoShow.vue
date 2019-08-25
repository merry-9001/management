<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <div class="user">
                    <img :src="$store.state.user.userHead" class="avatar" alt="">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="userinfo">
                    <div class="user-item">
                        <i class="el-icon-user-solid"></i>
                        <span>{{$store.state.user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="el-icon-s-tools"></i>
                        <span>{{$store.state.user.isAdmin=='manager'?'管理员':'会员'}}</span>
                    </div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
   .infoshow {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        /* padding: 16px; */
    }

    .row-bg {
        width: 100%;
        height: 100%;
    }

    .user {
        /* border:1px #000 solid; */
        text-align: right;
        position: relative;
        top: 30%;
    }

    .user img {
        text-align:right;
        /* border:1px #000 solid; */
        width: 150px;
        border-radius: 50%;
    }

    .user span {
        display: block;
        text-align: center;
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
    }

    .userinfo {
        height: 100%;
        background-color: #eee;
    }

    .user-item {
        position: relative;
        top: 30%;
        padding: 26px;
        font-size: 28px;
        color: #333;
    }
</style>