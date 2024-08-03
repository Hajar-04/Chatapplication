@extends('layouts.app')

@section('content')
<div class="container">
    <h1>User Profile</h1>
    <div class="card">
        <div class="card-body">
            <h2>{{ $user->name }}</h2>
            <img src="{{ asset('images/' . $user->photo) }}" alt="{{ $user->name }}" class="rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">
        </div>
    </div>
</div>
@endsection
