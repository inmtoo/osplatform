@extends('index')

@section('content')

    <div>
        <video id="video"></video>
        <div>
            <button id="start_streaming">Start streaming</button>
        </div>
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
    <script type="module" src="/js/start_webinar.js"></script>
@endsection