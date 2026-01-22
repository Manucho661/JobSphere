<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

interface JobListingRepositoryInterface
{
    public function paginateForIndex(Request $request, int $perPage = 7): LengthAwarePaginator;
}
