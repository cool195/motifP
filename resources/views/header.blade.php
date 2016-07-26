<header class="">
    <div class="container">
        <nav class="navbar-left">
            <ul class="nav navbar-primary">
                <li class="nav-item nav-logo">
                    <a href="#">
                        <img class="img-fluid" src="{{config('runtime.Image_URL')}}/images/logo/logo.png" alt="logo">
                    </a>
                </li>
                <li class="nav-item"><a class="nav-link active" href="#">DAILY</a></li>
                <li class="nav-item"><a class="nav-link" href="#">DESIGNER</a></li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SHOPPING</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item"><a href="#">Rings</a></li>
                        <li class="dropdown-item"><a href="#">Necklaces</a></li>
                        <li class="dropdown-item"><a href="#">Bracelets</a></li>
                        <li class="dropdown-item"><a href="#">Earrings</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <nav class="navbar-right">
            <ul class="nav navbar-primary">
                <li class="nav-item p-x-10x"><a href="#" class="nav-link">{{Session::get('user.nickname')}}</a></li>
                <li class="nav-item p-x-10x">
                    <a href="#" class="nav-link">
                        <img class="img-circle" src="@if(Session::has('user')) {{config('runtime.CDN_URL')}}/n1/{{Session::get('user.icon')}} @else {{config('runtime.Image_URL')}}/images/icon/apple-touch-icon.png @endif" width="40" height="40" alt="">
                    </a>
                </li>
                <li class="nav-item p-x-20x"><a href="#" class="nav-link"><i class="iconfont icon-shopbag font-size-lg text-primary"></i></a></li>
            </ul>
        </nav>
    </div>
</header>