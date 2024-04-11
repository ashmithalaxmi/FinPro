{{
    config(
        tags=['mart']
    )
}}

WITH

stg_user AS (

    SELECT

        user_ID, user_name, role

    FROM {{ ref('stg_user') }}
),

stg_project AS (

    SELECT

        project_id, project_name

    FROM {{ ref('stg_project') }}

),

stg_projassign AS (
    SELECT

        *

    FROM {{ ref('stg_projassign') }}
),

left_join_user_proj AS (
    SELECT
        u.*,
        p.*,
        a.allocation_start, a.allocation_end
    FROM stg_user u
    LEFT JOIN 
        stg_projassign a ON u.user_ID = a.user_ID
    LEFT JOIN 
        stg_project p ON a.project_id = p.project_id
)

SELECT * FROM  left_join_user_proj