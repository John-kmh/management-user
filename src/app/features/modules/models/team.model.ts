export interface Team {
  team_id: number;
  name: string;
  description: string;
  permissions?: Permission[];
  created_at?: string;
  updated_at?: string;
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  pivot: {
    team_id: number;
    permission_id: number;
  };
}

export interface TeamResponse {
  status: number;
  data: Team[];
  message: string;
}

// For POST /teams or PUT /teams/:id
export interface TeamItemResponse {
  status: number;
  data: Team; // ✅ single team
  message: string;
}
