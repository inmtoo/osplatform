@extends('index')

@section('content')

    <video id="video"></video>
    <div>
        <button id="connect">Connect</button>
    </div>


    <style>

        button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background: orangered;
            color: white;
            cursor: pointer;
        }
    </style>


@endsection


@section('scripts')
<script type="module" src="/js/webinar.js"></script>
@endsection