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

stg_feedback AS (
    SELECT

        *

    FROM {{ ref('stg_feedback') }}
),


left_join_user_feed AS (
    SELECT
        u.*,
        p.*,
        f.q1, f.q2, f.q3, f.q4, f.q5, f.user_comments
    FROM stg_user u
    LEFT JOIN 
        stg_feedback f ON u.user_ID = f.user_ID
    LEFT JOIN 
        stg_project p ON f.project_id = p.project_id
)

SELECT * FROM  left_join_user_feed