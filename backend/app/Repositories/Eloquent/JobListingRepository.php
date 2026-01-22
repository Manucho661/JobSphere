<?php

namespace App\Repositories\Eloquent;

use App\Models\JobListing;
use App\Repositories\Contracts\JobListingRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class JobListingRepository implements JobListingRepositoryInterface
{
    public function paginateForIndex(Request $request, int $perPage = 7): LengthAwarePaginator
    {
        $user = $request->user(); // may be null (guest)

        $query = JobListing::query()
            ->with('employer.user')
            ->withCount('likes')
            ->withExists([
                // 👍 is_liked
                'likes as is_liked' => function ($q) use ($user) {
                    if ($user) {
                        $q->where('user_id', $user->id);
                    } else {
                        $q->whereRaw('0 = 1');
                    }
                },

                // 💾 is_saved
                'savedBy as is_saved' => function ($q) use ($user) {
                    if ($user) {
                        $q->where('user_id', $user->id);
                    } else {
                        $q->whereRaw('0 = 1');
                    }
                },
            ])
            ->latest();

        // 1️⃣ Search
        if ($request->filled('search')) {
            $search = $request->string('search')->toString();

            $query->where(function ($q) use ($search) {
                $q->where('job_title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 2️⃣ Employment Type
        if ($request->filled('employmentType')) {
            $query->where('employment_type', $request->string('employmentType')->toString());
        }

        // 3️⃣ Work Mode
        if ($request->filled('remoteWork')) {
            $query->where('work_place', $request->string('remoteWork')->toString());
        }

        // 4️⃣ Experience Level
        if ($request->filled('experienceLevel')) {
            $query->where('experience_level', $request->string('experienceLevel')->toString());
        }

        // 5️⃣ Posted Within
        if ($request->filled('postedWithin')) {
            $timeMap = [
                '24h' => now()->subDay(),
                '3d'  => now()->subDays(3),
                '7d'  => now()->subDays(7),
                '14d' => now()->subDays(14),
                '30d' => now()->subDays(30),
            ];

            $key = $request->string('postedWithin')->toString();

            if (isset($timeMap[$key])) {
                $query->where('created_at', '>=', $timeMap[$key]);
            }
        }

        return $query->paginate($perPage);
    }


}
